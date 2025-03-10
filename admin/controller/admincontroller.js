import path from 'path';
import catchAsync from '../../utils/CatchAsync';
import * as adminService from '../service/adminService'


const approveDoctor = catchAsync(async (req, res) => {
    const { doctorId } = req.params;
    const response = await adminService.approveDoctor(doctorId);
    return res.status(200).json({msg:"Doctor approved successfully",response});
});

const rejectDoctor = catchAsync(async (req, res) => {
    const { doctorId} = req.params;
    const response = await adminService.rejectDoctor(doctorId);
    return res.status(200).json({ msg: "Doctor rejected successfully", response });
});

const deleteDoctor = catchAsync(async (req, res) => {
    const { doctorId } = req.params;
    const response = await adminService.deleteDoctor(doctorId);
    return res.status(200).json({ msg: "Doctor deleted successfully", response });
});

const getDoctorCV = catchAsync(async (req, res) => {
    const { doctorId } = req.params;
    const filePath = await adminService.getDoctorCV(doctorId);

    res.download(filePath, path.basename(filePath));
});

export {
    approveDoctor,
    rejectDoctor,
    deleteDoctor,
    getDoctorCV
}