import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export const createDefaultAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@gmail.com" });
    
    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: "admin@gmail.com",
        password: "admin",
        role: "admin"
      });
      console.log("Default admin account created successfully");
    }
  } catch (error) {
    console.log("Error creating default admin:", error.message);
  }
}; 