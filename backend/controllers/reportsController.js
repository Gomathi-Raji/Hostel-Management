import Tenant from "../models/Tenant.js";
import Room from "../models/Room.js";
import Payment from "../models/Payment.js";
import Ticket from "../models/Ticket.js";
import Expense from "../models/Expense.js";

// GET /api/reports/overview
export const getOverviewReport = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Tenants
    const totalTenants = await Tenant.countDocuments({ active: true });
    const newTenantsThisMonth = await Tenant.countDocuments({
      active: true,
      createdAt: { $gte: startOfMonth },
    });

    // Rooms
    const rooms = await Room.find({ active: true });
    const totalRooms = rooms.length;
    const totalCapacity = rooms.reduce((sum, r) => sum + r.capacity, 0);
    const totalOccupancy = rooms.reduce((sum, r) => sum + r.occupancy, 0);
    const occupancyRate = totalCapacity > 0 ? Math.round((totalOccupancy / totalCapacity) * 100) : 0;
    const availableRooms = rooms.filter(r => r.status === "available").length;
    const maintenanceRooms = rooms.filter(r => r.status === "maintenance").length;

    // Payments this month
    const paymentsThisMonth = await Payment.find({
      createdAt: { $gte: startOfMonth },
      status: "completed",
    });
    const monthlyRevenue = paymentsThisMonth.reduce((sum, p) => sum + p.amount, 0);
    const paymentsReceivedCount = paymentsThisMonth.length;

    // Payments last month for growth calc
    const paymentsLastMonth = await Payment.find({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
      status: "completed",
    });
    const lastMonthRevenue = paymentsLastMonth.reduce((sum, p) => sum + p.amount, 0);
    const revenueGrowth = lastMonthRevenue > 0
      ? Math.round(((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
      : 0;

    // Pending payments
    const pendingPayments = await Payment.countDocuments({ status: "pending" });
    const pendingAmount = (await Payment.find({ status: "pending" })).reduce(
      (sum, p) => sum + p.amount, 0
    );

    // Tickets
    const openTickets = await Ticket.countDocuments({ status: { $in: ["open", "in-progress"] } });
    const resolvedThisMonth = await Ticket.countDocuments({
      status: "resolved",
      updatedAt: { $gte: startOfMonth },
    });

    // Payment collection rate
    const totalDueThisMonth = monthlyRevenue + pendingAmount;
    const collectionRate = totalDueThisMonth > 0
      ? Math.round((monthlyRevenue / totalDueThisMonth) * 100)
      : 100;

    res.json({
      keyMetrics: {
        totalTenants,
        occupancyRate,
        monthlyRevenue,
        totalRooms,
        availableRooms,
        maintenanceRooms,
        openTickets,
      },
      recentActivity: {
        newTenants: newTenantsThisMonth,
        paymentsReceived: paymentsReceivedCount,
        resolvedTickets: resolvedThisMonth,
      },
      insights: {
        revenueGrowth,
        collectionRate,
        pendingPayments,
        pendingAmount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/reports/financial
export const getFinancialReport = async (req, res) => {
  try {
    const { months = 6 } = req.query;
    const now = new Date();
    const results = [];

    for (let i = Number(months) - 1; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);

      const payments = await Payment.find({
        createdAt: { $gte: start, $lte: end },
        status: "completed",
      });
      const expenses = await Expense.find({
        date: { $gte: start, $lte: end },
      });

      const income = payments.reduce((s, p) => s + p.amount, 0);
      const expense = expenses.reduce((s, e) => s + e.amount, 0);

      results.push({
        month: start.toLocaleString("default", { month: "short", year: "numeric" }),
        income,
        expense,
        profit: income - expense,
      });
    }

    // Payment by method breakdown (current month)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const byMethod = await Payment.aggregate([
      { $match: { createdAt: { $gte: startOfMonth }, status: "completed" } },
      { $group: { _id: "$method", total: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]);

    // Payment by type breakdown
    const byType = await Payment.aggregate([
      { $match: { createdAt: { $gte: startOfMonth }, status: "completed" } },
      { $group: { _id: "$type", total: { $sum: "$amount" }, count: { $sum: 1 } } },
    ]);

    res.json({ monthly: results, byMethod, byType });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/reports/occupancy
export const getOccupancyReport = async (req, res) => {
  try {
    const rooms = await Room.find({ active: true });

    const byType = {};
    for (const room of rooms) {
      if (!byType[room.type]) {
        byType[room.type] = { total: 0, occupied: 0, available: 0, maintenance: 0, capacity: 0, occupancy: 0 };
      }
      byType[room.type].total += 1;
      byType[room.type].capacity += room.capacity;
      byType[room.type].occupancy += room.occupancy;
      if (room.status === "available") byType[room.type].available += 1;
      else if (room.status === "occupied") byType[room.type].occupied += 1;
      else if (room.status === "maintenance") byType[room.type].maintenance += 1;
    }

    const roomList = rooms.map((r) => ({
      number: r.number,
      type: r.type,
      status: r.status,
      capacity: r.capacity,
      occupancy: r.occupancy,
      rent: r.rent,
    }));

    res.json({ byType, rooms: roomList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/reports/tenant-activity
export const getTenantActivityReport = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const totalActive = await Tenant.countDocuments({ active: true });
    const totalInactive = await Tenant.countDocuments({ active: false });
    const newThisMonth = await Tenant.countDocuments({ createdAt: { $gte: startOfMonth } });

    // Recent tenants
    const recentTenants = await Tenant.find()
      .populate("room", "number")
      .sort({ createdAt: -1 })
      .limit(10)
      .select("firstName lastName email phone room active createdAt");

    res.json({
      summary: { totalActive, totalInactive, newThisMonth },
      recentTenants,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/reports/tenant-data  (CSV-friendly list)
export const getTenantDataReport = async (req, res) => {
  try {
    const tenants = await Tenant.find()
      .populate("room", "number type rent")
      .sort({ createdAt: -1 })
      .select("firstName lastName email phone room moveInDate securityDeposit active createdAt");

    res.json({ tenants });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
