import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {AppError} from '../../utils/AppError.js';
import {GenerateToken} from '../../utils/GenerateToken.js';
import { findDoctorByEmail, createDoctor, updateDoctor, updateDoctorCV } from '../repo/doctorRepo.js';
import * as AuthRepo from "../../Auth/repo/authRepo.js"
import Doctor from "../model/doctorModel.js"
import * as LocationRepo from '../../locations/repository/locationRepo.js';

 const registerDoctor = async (userData) => {
  const { userName, email, password, specialization, 
          consultationFees, cv, working_days, locations, addresses } = userData;

  // Input validation
  if (!email || typeof email !== 'string') {
      throw new AppError('Email is required and must be a string', 400);
  }

  // Check if user already exists
  const oldUser = await AuthRepo.FindByEmail(email);
  if (oldUser) {
      throw new AppError('Account already exists!', 400);
  }

  // Hash password
  const hash_pass = await bcrypt.hash(password, 12);

  // Create new user
  const newUser = {
      userName,
      email,
      password: hash_pass,
      role: 'doctor', 
  };

  // Generate token
  const token = GenerateToken({ email: newUser.email, id: newUser._id });
  newUser.token = token;

  // Save user
  const savedUser = await AuthRepo.saveUser(newUser);

  // Handle locations
  const locationIds = [];
  const uniqueLocations = new Set();
  const existingDoctor = await Doctor.findOne({ user: savedUser._id }).populate('locations');
  const existingGovernorates = new Set(existingDoctor ? existingDoctor.locations.map(loc => loc.name) : []);

  for (const locationName of locations) {
      // Check if already assigned to this doctor
      if (existingGovernorates.has(locationName.toUpperCase())) {
          throw new AppError(`Governorate '${locationName}' is already added to this doctor!`, 400);
      }

      // Check for duplicates in current request
      if (uniqueLocations.has(locationName.toUpperCase())) {
          throw new AppError(`Governorate '${locationName}' is duplicated in this request!`, 400);
      }

      // Find or create location
      let location = await LocationRepo.findLocationByName(locationName);
      if (!location) {
          location = await LocationRepo.addLocation({ name: locationName });
      }

      if (!location) {
          throw new AppError(`Failed to process location: ${locationName}`, 500);
      }

      locationIds.push(location._id);
      uniqueLocations.add(locationName.toUpperCase());
  }

  // Create doctor profile
  const newDoctor = {
      user: savedUser._id, 
      specialization,
      consultationFees,
      cv,
      working_days,
      locations: locationIds, 
      addresses, 
  };

  await createDoctor(newDoctor);

  return token;
};

const loginDoctor = async (email, password, res) => {
  const doctor = await findDoctorByEmail(email);
  if (!doctor) {
    throw new AppError("Doctor not found!", 404);
  }

  const isMatch = await bcrypt.compare(password, doctor.password);
  if (!isMatch) {
    throw new AppError("Password or email is incorrect!", 401);
  }

  const token = GenerateToken({ email: doctor.email, id: doctor._id }, res);
  doctor.token = token;
  await updateDoctor(doctor._id, doctor);
  return token;
};

const updateDoctorProfile = async (id, updateData) => {
  const updatedDoctor = await updateDoctor(id, updateData);
  if(!updatedDoctor) throw new AppError("no data", 401);
  return updatedDoctor;
};

const uploadDoctorCV = async (id, cvPath) => {
  const updatedDoctor = await updateDoctorCV(id, cvPath);
  if(!updatedDoctor) throw new AppError("no data", 401);
  return updatedDoctor;
};


const filterDoctors = async (filters) => {
  try {
    const { specialization, location, page = 1, limit = 10 } = filters;
    const query = {};

    // Specialization is always an ObjectId
    if (specialization && mongoose.Types.ObjectId.isValid(specialization)) { 
      query.specialization = specialization;
    }
    // Filter by location (exact match)
    if (location) { 
      query.locations = location;
    }

    const skip = (page - 1) * limit;
    const doctorsPromise = Doctor.find(query)
      .populate('specialization', 'name')
      .lean()
      .skip(skip)
      .limit(limit)
      .select('name specialization locations consultationFees');

    const totalCountPromise = Doctor.countDocuments(query);
    const [doctors, totalCount] = await Promise.all([doctorsPromise, totalCountPromise]);

    return { doctors, totalCount };
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw new Error("Failed to fetch doctors");
  }
};


export { registerDoctor, loginDoctor, updateDoctorProfile, uploadDoctorCV , filterDoctors };
