import express from 'express';
import { createDish, getAllDishes, getDishById, updateDish, deleteDish } from '../controller/dishController.js';

const router = express.Router();

router.post('/adddish', createDish);
router.get('/listdishes', getAllDishes);
router.get('/:id', getDishById);
router.put('/:id', updateDish);
router.delete('/:id', deleteDish);

export default router;
