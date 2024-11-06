import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FiGithub } from 'react-icons/fi';
import '../../styles/Login.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:4000/api/auth/register', formData);
      toast.success('Đăng ký thành công!');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="login-container"
      style={{
        backgroundImage: "url('/public/auth-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="login-box">
        <div className="flex flex-col md:flex-row">
          {/* Form Side */}
          <div className="md:w-1/2">
            <div className="login-form">
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input-field"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input-field"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="input-field"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="submit-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="loading-spinner" />
                  ) : (
                    <>Đăng ký</>
                  )}
                </motion.button>
              </form>

              <div className="social-login">
                <a href="#" className="social-button">
                  <FaFacebook />
                </a>
                <a href="#" className="social-button">
                  <FcGoogle />
                </a>
                <a href="#" className="social-button">
                  <FiGithub />
                </a>
              </div>
            </div>
          </div>

          {/* Info Side */}
          <div className="md:w-1/2">
            <div className="info-side">
              <h2>Đã có tài khoản?</h2>
              <p>Đăng nhập để truy cập tất cả các tính năng của dịch vụ. Quản lý công việc của bạn tại một nơi.</p>
              <Link to="/login" className="text-red-500 hover:text-red-400 font-medium" style={{ textDecoration: 'underline', color: 'red' }}>
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register; 