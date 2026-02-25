import express from "express";
import {
  getTickets,
  getTicket,
  addTicket,
  updateTicket,
  deleteTicket,
  getTicketStats,
  getTenantTickets,
} from "../controllers/ticketController.js";
import { protect, staffOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, staffOnly, getTickets);
router.get("/stats", protect, staffOnly, getTicketStats);
// Tenant ticket endpoint (must be before /:id)
router.get("/tenant/my-tickets", protect, getTenantTickets);
router.get("/:id", protect, staffOnly, getTicket);
router.post("/", protect, addTicket); // tenants or staff can create
router.put("/:id", protect, staffOnly, updateTicket);
router.delete("/:id", protect, staffOnly, deleteTicket);

export default router;
