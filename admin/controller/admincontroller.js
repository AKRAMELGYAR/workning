import path from 'path';
import {CatchAsync} from '../../utils/CatchAsync.js';
import * as adminService from '../service/adminService.js'


const approveDoctor = CatchAsync(async (req, res) => {
    const { doctorId } = req.params;
    const response = await adminService.approveDoctor(doctorId);
    return res.status(200).json({response});
});

const rejectDoctor = CatchAsync(async (req, res) => {
    const { doctorId} = req.params;
    const response = await adminService.rejectDoctor(doctorId);
    return res.status(200).json({ msg: "Doctor rejected successfully", response });
});

const deleteDoctor = CatchAsync(async (req, res) => {
    const { doctorId } = req.params;
    const response = await adminService.deleteDoctor(doctorId);
    return res.status(200).json({ msg: "Doctor deleted successfully", response });
});

const getDoctorCV = CatchAsync(async (req, res) => {
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