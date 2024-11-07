import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";
import { adminController } from "../controllers/adminController.js";
import { getUserProfile } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

// Protected route example
router.get("/admin-only", isAuthenticatedUser, authorizeRoles("admin"), adminController);
router.get("/me", isAuthenticatedUser, getUserProfile);

export default router; 