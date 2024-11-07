import { User } from "../models/user.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/sendToken.js";
import bcrypt from 'bcrypt';
// Register user
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }

    user = await User.create({
      name,
      email,
      password,
    });

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};
export const createAdminAccount = async () => {
  try {
    const adminExists = await User.findOne({ name: 'admin' });
    if (!adminExists) {
      const admin = await User.create({
        name: 'admin',
        password: '123456',
        role: 'admin',
        email: 'admin@example.com'
      });
      console.log('Tài khoản Admin đã được tạo thành công');
    }
  } catch (error) {
    console.error('Lỗi khi tạo tài khoản Admin:', error);
  }
};
// Login user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Vui lòng nhập email và password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Email hoặc mật khẩu không đúng", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Email hoặc mật khẩu không đúng", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Logout user
export const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Đăng xuất thành công",
    });
  } catch (error) {
    next(error);
  }
};

// Get user profile
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
}; 