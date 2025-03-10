import { registerDoctor, loginDoctor, updateDoctorProfile, uploadDoctorCV } from '../services/doctorServices.js';
import AppError from '../../utils/AppError.js';

const registerDoctorController = async (req, res, next) => {
  try {
    const token = await registerDoctor(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Doctor registered successfully!',
      token,
    });
  } catch (err) {
    next(err);
  }
};

const loginDoctorController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await loginDoctor(email, password, res);
    res.status(200).json({
      status: 'success',
      message: 'Doctor logged in successfully!',
      token,
    });
  } catch (err) {
    next(err);
  }
};

const updateDoctorProfileController = async (req, res, next) => {
  try {
    const { id } = req.user; 
    const updatedDoctor = await updateDoctorProfile(id, req.body);
    res.status(200).json({
      status: 'success',
      message: 'Doctor profile updated successfully!',
      data: updatedDoctor,
    });
  } catch (err) {
    next(err);
  }
};

const uploadDoctorCVController = async (req, res, next) => {
  try {
    const { id } = req.user; 
    const cvPath = req.file.path;
    const updatedDoctor = await uploadDoctorCV(id, cvPath);
    res.status(200).json({
      status: 'success',
      message: 'Doctor CV uploaded successfully!',
      data: updatedDoctor,
    });
  } catch (err) {
    next(err);
  }
};

export {
  registerDoctorController,
  loginDoctorController,
  updateDoctorProfileController,
  uploadDoctorCVController,
};
