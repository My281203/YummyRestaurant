import express from "express";
import { getFoodsByCategory, getAllCategories } from "../controllers/foodController.js";

const router = express.Router();

router.get("/category/:categoryId", getFoodsByCategory);
router.get("/categories", getAllCategories);

export default router; 