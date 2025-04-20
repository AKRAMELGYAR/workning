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
          console.log(userData)

  if (!email || typeof email !== 'string') {
      throw new AppError('Email is required and must be a string', 400);
  }

  const oldUser = await AuthRepo.FindByEmail(email);
  if (oldUser) {
      throw new AppError('Account already exists!', 400);
  }

  const hash_pass = await bcrypt.hash(password, 12);
  const newUser = {
      userName,
      email,
      password: hash_pass,
      role: 'doctor',
  };

  const token = GenerateToken({ email: newUser.email, id: newUser._id });
  newUser.token = token;

  const savedUser = await AuthRepo.saveUser(newUser);

  // ===⬇️ Check for duplicates and valid ObjectIds ⬇️===
  const locationIds = [];
  const uniqueIds = new Set();

  for (const locationId of locations) {
    // Check for duplicate IDs in same request
    if (uniqueIds.has(locationId)) {
      throw new AppError(`Duplicate location ID in request: ${locationId}`, 400);
    }
    // Check if location exists
    const location = await LocationRepo.getLocationByIdFromDB(locationId);
    if (!location) {
      throw new AppError(`Location not found: ${locationId}`, 404);
    }

    uniqueIds.add(locationId);
    locationIds.push(locationId);
  }

  // Check if doctor already has those locations
  const existingDoctor = await Doctor.findOne({ user: savedUser._id });
  if (existingDoctor) {
    const existingIds = existingDoctor.locations.map(id => id.toString());
    for (const id of locationIds) {
      if (existingIds.includes(id.toString())) {
        throw new AppError(`Location ID ${id} is already assigned to this doctor!`, 400);
      }
    }
  }

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

    if (specialization) {
      query.specialization = new mongoose.Types.ObjectId(specialization);
    }

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
