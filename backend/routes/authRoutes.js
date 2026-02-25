import express from "express";
import { register, login, updateUserTenant, getProfile, updateProfile, updateSettings, changePassword, forgotPassword, resetPassword, uploadProfileImage } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { registerRules, loginRules, forgotPasswordRules, resetPasswordRules, validate } from "../middleware/validators.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/register", registerRules, validate, register);
router.post("/login", loginRules, validate, login);
router.post("/forgot-password", forgotPasswordRules, validate, forgotPassword);
router.post("/reset-password", resetPasswordRules, validate, resetPassword);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.post("/profile/upload-image", protect, upload.single("profileImage"), uploadProfileImage);
router.put("/settings", protect, updateSettings);
router.put("/change-password", protect, changePassword);
router.put("/update-tenant", protect, updateUserTenant);

export default router;
