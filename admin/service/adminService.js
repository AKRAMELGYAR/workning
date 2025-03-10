import { AppError } from "../../utils/AppError";
import * as Repo from "../repo/adminRepo"

const approveDoctor =  async(doctorId)=>{

    const doctor = await Repo.findById(doctorId);//
    if (!doctor) throw new AppError("user not found!" , 404);

    doctor.isApproved = true;
    await doctor.save();

    return { message: "Doctor approved successfully." };
}

const rejectDoctor = async(doctorId)=>{
    const doctor = await Repo.findById(doctorId);//
    if (!doctor) throw new AppError("Doctor not found.",404);

    doctor.isApproved = false;
    await doctor.save();

    return { message: "Doctor rejected" };
}

const deleteDoctor = async(doctorId)=>{
    const doctor = await Repo.findByIdAndDelete(doctorId);//
    if (!doctor) throw new AppError("Doctor not found.",404);

    return { message: "Doctor deleted successfully." };
}

const getDoctorCV = async(doctorId)=>{
    const doctor = await Repo.findById(doctorId);//
    if (!doctor) throw new AppError("Doctor not found.",404);
    if (!doctor.cvFilePath) throw new AppError("Doctor has not uploaded a CV.",404);

    return doctor.cvFilePath;
}



export {
    approveDoctor,
    rejectDoctor,
    deleteDoctor,
    getDoctorCV
}