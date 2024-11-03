const User = require('../models/user');
const Dish = require('../models/dish');
const Reservation = require('../models/reservation');
const ErrorHandler = require('../middlewares/error');

// User Management
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// Dish Management
exports.createDish = async (req, res, next) => {
  try {
    const dish = await Dish.create(req.body);
    res.status(201).json({
      success: true,
      dish
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

exports.updateDish = async (req, res, next) => {
  try {
    let dish = await Dish.findById(req.params.id);
    if (!dish) {
      return next(new ErrorHandler('Dish not found', 404));
    }
    
    dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      dish
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

exports.deleteDish = async (req, res, next) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return next(new ErrorHandler('Dish not found', 404));
    }
    
    await dish.remove();
    res.status(200).json({
      success: true,
      message: 'Dish deleted successfully'
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

// Reservation Management
exports.updateReservationStatus = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return next(new ErrorHandler('Reservation not found', 404));
    }

    reservation.status = req.body.status;
    await reservation.save();

    // If completed, increment orderCount for dishes
    if (req.body.status === 'completed') {
      for (let item of reservation.dishes) {
        await Dish.findByIdAndUpdate(item.dish, {
          $inc: { orderCount: item.quantity }
        });
      }
    }

    res.status(200).json({
      success: true,
      reservation
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

// Statistics
exports.getDishStatistics = async (req, res, next) => {
  try {
    const dishes = await Dish.find().sort('-orderCount').limit(10);
    
    const stats = dishes.map(dish => ({
      name: dish.title,
      orders: dish.orderCount
    }));

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
}; 