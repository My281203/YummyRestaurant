import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import toast from 'react-hot-toast';
import '../../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const response = await axios.post('http://localhost:4000/api/auth/login', formData);
      console.log(response);
      toast.success('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Đăng nhập thất bại');
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
                    placeholder="Enter your password"
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
                    <>Sign up</>
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
              <h2>Don't have an account?</h2>
              <p>Register to access all the features of our services. Manage your business in one place. It's free!</p>
              <Link to="/register" className="text-red-500 hover:text-red-400 font-medium" style={{ textDecoration: 'underline',color: 'red' }}>
                Have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 