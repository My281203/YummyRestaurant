import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/DishManagement.css';

const DishManagement = () => {
    const [dishes, setDishes] = useState([]);
    const [dish, setDish] = useState({ name: '', description: '', price: '', category: '', image: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchDishes();
    }, []);

    const fetchDishes = async () => {
        // Cập nhật URL để lấy danh sách món ăn
        const response = await axios.get('http://localhost:4000/dishes/listdishes');
        setDishes(response.data);
    };

    const handleChange = (e) => {
        setDish({ ...dish, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            // Cập nhật URL để sửa món ăn
            await axios.put(`http://localhost:4000/dishes/${editingId}`, dish);
        } else {
            // Cập nhật URL để tạo món ăn
            await axios.post('http://localhost:4000/dishes/adddish', dish);
        }
        setDish({ name: '', description: '', price: '', category: '', image: '' });
        setEditingId(null);
        fetchDishes();
    };

    const handleEdit = (dish) => {
        setDish(dish);
        setEditingId(dish._id);
    };

    const handleDelete = async (id) => {
        // Cập nhật URL để xóa món ăn
        await axios.delete(`http://localhost:4000/dishes/${id}`);
        fetchDishes();
    };

    return (
        <div className="dish-management">
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={dish.name} onChange={handleChange} required />
                <input name="description" placeholder="Description" value={dish.description} onChange={handleChange} required />
                <input name="price" placeholder="Price" value={dish.price} onChange={handleChange} required />
                <input name="category" placeholder="Category" value={dish.category} onChange={handleChange} required />
                <input name="image" placeholder="Image URL" value={dish.image} onChange={handleChange} />
                <button type="submit">{editingId ? 'Update' : 'Add'} Dish</button>
            </form>

            <ul>
                {dishes.map(d => (
                    <li key={d._id}>
                        <h3>{d.name}</h3>
                        <p>{d.description}</p>
                        <p>Price: {d.price}</p>
                        <p>Category: {d.category}</p>
                        {d.image && <img src={d.image} alt={d.name} />}
                        <button onClick={() => handleEdit(d)}>Edit</button>
                        <button onClick={() => handleDelete(d._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DishManagement;
