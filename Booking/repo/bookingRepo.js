import Booking from "../model/bookingModel.js";
import Schedule from "../../Doctor Schedule/model/scheduleModel.js";

export const createBooking = async (bookingData) => {
    return await Booking.create(bookingData);
};

export const updateBookingStatus = async (bookingId, status) => {
    return await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });
};

export const findBookingsByDoctor = async (doctorId) => {
    return await Booking.find(doctorId).populate("patientId", "name email").populate("scheduleId");
};

export const findScheduleById = async (scheduleId) => {
    return await Schedule.findById(scheduleId);
};

export const updateSlotStatus = async (scheduleId, slotId, updates) => {
    return await Schedule.findOneAndUpdate(
        { _id: scheduleId, "slots._id": slotId },
        { $set: { "slots.$.status": updates.status, "slots.$.patientId": updates.patientId, "slots.$.isBooked": updates.isBooked } },
        { new: true }
    );
};

export const findAvailableSlots = async (doctorId) => {
    return await Schedule.find({ doctorId,"slots.status": "available" });
};