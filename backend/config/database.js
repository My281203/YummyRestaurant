import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cấu hình dotenv
dotenv.config();

const connectDatabase = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "RESERVATIONS",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`MongoDB connected: ${connection.host}`);
  } catch (error) {
    console.log("Error: " + error.message);
    process.exit(1);
  }
};

export default connectDatabase; 