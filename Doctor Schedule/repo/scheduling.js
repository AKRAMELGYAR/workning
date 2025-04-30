import scheduleModel from "../model/scheduleModel.js";
import User from "../../user/userModel.js";

export const findUser = async ({payload}) => {
    return await User.findOne(payload);
}


export const setSchedule = async (availableSlots) => {
    return await scheduleModel.insertMany(availableSlots);
}


export const delSchedule = async ({payload}) => {
    return await scheduleModel.deleteOne(payload);
}