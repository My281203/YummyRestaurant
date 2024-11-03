import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, dishesRes, reservationsRes, statsRes] = await Promise.all([
        axios.get('/api/admin/users'),
        axios.get('/api/admin/dishes'),
        axios.get('/api/admin/reservations'),
        axios.get('/api/admin/statistics/dishes')
      ]);

      setUsers(usersRes.data.users);
      setDishes(dishesRes.data.dishes);
      setReservations(reservationsRes.data.reservations);
      setStatistics(statsRes.data.stats);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`/api/admin/reservation/${id}`, { status });
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      {/* Statistics Chart */}
      {statistics && (
        <div className="statistics-chart">
          <h2>Popular Dishes</h2>
          <Bar
            data={{
              labels: statistics.map(stat => stat.name),
              datasets: [{
                label: 'Number of Orders',
                data: statistics.map(stat => stat.orders),
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
              }]
            }}
          />
        </div>
      )}

      {/* Reservations Management */}
      <div className="reservations-section">
        <h2>Recent Reservations</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <tr key={reservation._id}>
                <td>{`${reservation.firstName} ${reservation.lastName}`}</td>
                <td>{reservation.date}</td>
                <td>{reservation.time}</td>
                <td>{reservation.status}</td>
                <td>
                  <select
                    value={reservation.status}
                    onChange={(e) => handleStatusUpdate(reservation._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Complete</option>
                    <option value="cancelled">Cancel</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard; 