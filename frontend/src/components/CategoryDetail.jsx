import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CategoryDetail() {
  const [foods, setFoods] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(`/api/categories/${categoryId}/foods`);
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };
    fetchFoods();
  }, [categoryId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div key={food.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={food.image} 
              alt={food.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{food.name}</h3>
              <p className="text-gray-600 mb-2">{food.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-red-600">
                  {food.price.toLocaleString('vi-VN')}đ
                </span>
                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryDetail; 