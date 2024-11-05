import ErrorHandler from "../middlewares/error.js";
import { Reservation } from "../models/reservation.js";

export const send_reservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone, tableNumber, customerNumber } = req.body;

  if (!firstName || !lastName || !email || !date || !time || !phone || !tableNumber || !customerNumber) {
    return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
  }

  try {
    // Tạo mới một đặt bàn và lưu vào biến reservation
    const reservation = await Reservation.create({
      firstName,
      lastName,
      email,
      date,
      time,
      phone,
      tableNumber,
      customerNumber,
      status: "Waiting"
    });
    
    // Trả về ID của đặt bàn vừa được tạo
    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
      reservationId: reservation._id // Lấy ID từ đối tượng reservation
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }

    return next(error);
  }
};


export const update_status = async (req, res, next) => {
  const reservationId = req.params.id.trim();  
  console.log("Received ID:", reservationId);
  console.log("Received Body:", req.body);

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!updatedReservation) {
      return next(new ErrorHandler("Reservation not found!", 404));
    }

    res.status(200).json({
      success: true,
      message: "Reservation status updated successfully!",
      reservation: updatedReservation,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return next(new ErrorHandler("Failed to update reservation status.", 500));
  }
};


export const list_reservation = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




export const getReservationsByDateAndStatus = async (req, res) => {
    const { date, status } = req.query;

    // Loại bỏ ký tự không mong muốn
    const trimmedStatus = status.trim();

    try {
        const reservations = await Reservation.find({ date, status: trimmedStatus });

        if (reservations.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No reservations found for date: ${date} and status: ${trimmedStatus}.`
            });
        }

        return res.status(200).json({
            success: true,
            reservations
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




