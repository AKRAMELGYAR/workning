import { registerDoctor, loginDoctor, updateDoctorProfile, uploadDoctorCV  , filterDoctors , searchDoctorsByName} from '../services/doctorServices.js';
import {AppError} from '../../utils/AppError.js';
import Doctor from '../model/doctorModel.js';
import { CatchAsync } from '../../utils/CatchAsync.js';
import mongoose  from "mongoose";


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

 const uploadDoctorCVController = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        status: 'FAIL', 
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
    next(err);}

const uploadDoctorCVController = CatchAsync(
  async (req, res, next) => {
      const cvPath = req.file.path;
      const updatedDoctor = await uploadDoctorCV(req.params.id, cvPath);
      res.status(200).json({
        status: 'success',
        message: 'Doctor CV uploaded successfully!!',
        data: updatedDoctor,
      });
  }
)}

const FilterDoctors = async (req, res) => {
  try {
    const filters = {
      specialization: req.query.specialization,
      location: req.query.location,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    };

    if (filters.specialization && !mongoose.Types.ObjectId.isValid(filters.specialization)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid specialization ObjectId format',
      });
    }

    const result = await filterDoctors(filters);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in FilterDoctors:", error);
    res.status(500).json({ message: error.message });
  }
};

 const searchDoctorsName = async (req, res) => {
  try {
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({ message: 'Name query parameter is required' });
    }

    const doctors = await searchDoctorsByName(name);
    res.status(200).json({
      success: true,
      data: doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export {
  registerDoctorController,
  loginDoctorController,
  updateDoctorProfileController,
  uploadDoctorCVController,
  FilterDoctors ,
  searchDoctorsName
}
