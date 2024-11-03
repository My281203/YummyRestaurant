const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(new ErrorHandler('Please login to access this resource', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (user.role !== 'admin') {
      return next(new ErrorHandler('Not authorized to access this resource', 403));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ErrorHandler('Not authorized to access this resource', 401));
  }
}; 