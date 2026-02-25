import express from "express";
import {
  getOverviewReport,
  getFinancialReport,
  getOccupancyReport,
  getTenantActivityReport,
  getTenantDataReport,
} from "../controllers/reportsController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/overview", protect, adminOnly, getOverviewReport);
router.get("/financial", protect, adminOnly, getFinancialReport);
router.get("/occupancy", protect, adminOnly, getOccupancyReport);
router.get("/tenant-activity", protect, adminOnly, getTenantActivityReport);
router.get("/tenant-data", protect, adminOnly, getTenantDataReport);

export default router;
