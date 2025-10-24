import express from "express";
import { register, login, updateUserTenant } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update-tenant", updateUserTenant);

export default router;
