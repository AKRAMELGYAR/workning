import { registerDoctor, loginDoctor, updateDoctorProfile, uploadDoctorCV } from '../services/doctorServices.js';
import Doctor from '../model/doctorModel.js';
import { CatchAsync } from '../../utils/CatchAsync.js';

const registerDoctorController = CatchAsync(
  async (req, res, next) => {
      const token = await registerDoctor(req.body);
      res.status(201).json({
        status: 'success',
        message: 'Doctor registered successfully!',
        token,
      });
  }
)

const loginDoctorController = CatchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const token = await loginDoctor(email, password, res);
    res.status(200).json({
      status: 'success',
      message: 'Doctor logged in successfully!',
      token,
    });
})

const updateDoctorProfileController = CatchAsync(
  async (req, res, next) => {
      const { id } = req.params; 
      const updatedDoctor = await updateDoctorProfile(id, req.body);
      res.status(200).json({
        status: 'success',
        message: 'Doctor profile updated successfully!',
        data: updatedDoctor,
      });
  }
)

const uploadDoctorCVController = CatchAsync(
  async (req, res, next) => {
      const cvPath = req.file.path;
      const updatedDoctor = await uploadDoctorCV(req.params.id, cvPath);
      res.status(200).json({
        status: 'success',
        message: 'Doctor CV uploaded successfully!',
        data: updatedDoctor,
      });
  }
)

export {
  registerDoctorController,
  loginDoctorController,
  updateDoctorProfileController,
  uploadDoctorCVController,
};
