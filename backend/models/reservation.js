import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [2, "First name must be of at least 32haracters."],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [2, "Last name must be of at least 2 Characters."],
    maxLength: [30, "Last name cannot exceed 30 Characters."],
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone number must contain 10 Digits."],
    maxLength: [10, "Phone number must contain 10 Digits."],
  },
  tableNumber: {
    type: Number,
    required: true,
    min: [1, "Table number must be at least 1."],
  },
  customerNumber: {
    type: Number,
    required: true,
    min: [1, "There must be at least 1 customer."],
  },
  status: {
    type: String,
    enum: ["Completed", "Canceled", "Waiting"],
    default: "Waiting",
    required: true,
  },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);
