import express from "express";
import  { list_reservation,send_reservation } from "../controller/reservation.js";

const router = express.Router();
router.get("/",list_reservation);

router.post("/send", send_reservation);


export default router;
