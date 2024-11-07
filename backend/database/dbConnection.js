import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "RESERVATIONS",
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to database!");
  } catch (err) {
    console.error(`Error connecting to database: ${err}`);
    process.exit(1); // Thoát ứng dụng nếu không thể kết nối
  }
};
