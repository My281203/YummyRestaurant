import express from "express";
import  { list_reservation,send_reservation,update_status,getReservationsByDateAndStatus } from "../controllers/reservation.js";

const router = express.Router();
router.get("/",list_reservation);

router.post("/send", send_reservation);
router.put("/update/:id", update_status);
router.get("/filter", getReservationsByDateAndStatus);

export default router;