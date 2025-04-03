import express from "express";
import * as bookingController from "../controllers/bookingController.js";
import { verifying } from "../../middlewares/verifying.js";

const router = express.Router();

//get available slots for a doctor
router.get("/slots", bookingController.getAvailableSlots);

//book a slot
router.post("/book", bookingController.bookSlot);

//respond to booking request
router.put("/respond", bookingController.respondToBooking);

//get bookings for a doctor
router.get("/bookings", bookingController.getDoctorBookings);

export default router;