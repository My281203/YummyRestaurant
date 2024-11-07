import { Food } from "../models/food.js";
import ErrorHandler from "../middlewares/error.js";

// Lấy tất cả món ăn theo category ID
export const getFoodsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const foods = await Food.find({ category: categoryId })
      .populate('category', 'name');
    
    res.status(200).json({
      success: true,
      foods
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Lấy tất cả categories
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    
    res.status(200).json({
      success: true,
      categories
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}; 