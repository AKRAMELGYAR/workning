import { registerDoctor, loginDoctor, updateDoctorProfile, uploadDoctorCV  , filterDoctors} from '../services/doctorServices.js';
import {AppError} from '../../utils/AppError.js';

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
    if (!req.file) {
      return res.status(400).json({ 
        status: 'fail', 
        message: 'No CV file uploaded' 
      });
    }

    const { id } = req.user;
    const cvUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    console.log("cvUrl:", cvUrl);
    
    const updatedDoctor = await uploadDoctorCV(id, cvUrl);
    if (!updatedDoctor) {
      return res.status(500).json({ status: 'fail', message: 'Failed to update doctor CV' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Doctor CV uploaded successfully!',
      data: updatedDoctor,
    });
  } catch (err) {
    next(err);
  }
};

 const FilterDoctors = async (req, res) => {
  try {
      const filters = {
          specialization: req.query.specialization,
          location: req.query.location,
          page: Number(req.query.page) || 1,
          limit: Number(req.query.limit) || 10,
      };
      console.log("specialization "+ filters.specialization);  
      const result = await filterDoctors(filters);
      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

export {
  registerDoctorController,
  loginDoctorController,
  updateDoctorProfileController,
  uploadDoctorCVController,
  FilterDoctors
};
