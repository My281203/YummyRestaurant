import Menu from '../models/menu.js';

// Tạo một món ăn mới
export const createMenuItem = async (req, res) => {
    const { name, description, price, category, image } = req.body;
    try {
        const menuItem = new Menu({ name, description, price, category, image });
        await menuItem.save();
        res.status(201).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy tất cả món ăn
export const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy món ăn theo ID
export const getMenuItemById = async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (!menuItem) return res.status(404).json({ message: "Menu item not found" });
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật món ăn theo ID
export const updateMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!menuItem) return res.status(404).json({ message: "Menu item not found" });
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa món ăn theo ID
export const deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.findByIdAndDelete(req.params.id);
        if (!menuItem) return res.status(404).json({ message: "Menu item not found" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
