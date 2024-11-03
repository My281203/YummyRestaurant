import express from 'express';
import { createMenuItem, getAllMenuItems, getMenuItemById, updateMenuItem, deleteMenuItem } from '../controller/menuController.js';

const router = express.Router();

router.post('/add', createMenuItem); 
router.get('/', getAllMenuItems);     
router.get('/:id', getMenuItemById);  
router.put('/:id', updateMenuItem);    
router.delete('/:id', deleteMenuItem); 

export default router;
