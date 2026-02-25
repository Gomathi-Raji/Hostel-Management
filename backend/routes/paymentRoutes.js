import express from "express";
import {
  getPayments,
  getPayment,
  addPayment,
  updatePayment,
  deletePayment,
  getPaymentStats,
  getTenantPayments,
} from "../controllers/paymentController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getPayments);
router.get("/stats", protect, adminOnly, getPaymentStats);
// Tenant payment/invoice endpoint (must be before /:id)
router.get("/tenant/my-payments", protect, getTenantPayments);
router.get("/:id", protect, adminOnly, getPayment);
router.post("/", protect, adminOnly, addPayment);
router.put("/:id", protect, adminOnly, updatePayment);
router.delete("/:id", protect, adminOnly, deletePayment);

export default router;
