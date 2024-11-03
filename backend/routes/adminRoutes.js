const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createDish,
  updateDish,
  deleteDish,
  updateReservationStatus,
  getDishStatistics
} = require('../controllers/adminController');

// User routes
router.get('/users', getAllUsers);

// Dish routes
router.post('/dish', createDish);
router.put('/dish/:id', updateDish);
router.delete('/dish/:id', deleteDish);

// Reservation routes
router.put('/reservation/:id', updateReservationStatus);

// Statistics routes
router.get('/statistics/dishes', getDishStatistics);

module.exports = router; 