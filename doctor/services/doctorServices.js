import bcrypt from 'bcrypt';
import {AppError} from '../../utils/AppError.js';
import {GenerateToken} from '../../utils/GenerateToken.js';
import { findDoctorByEmail, createDoctor, updateDoctor, updateDoctorCV } from '../repo/doctorRepo.js';

const registerDoctor = async (userData) => {
  console.log(userData)
  const { userName, email, password, Cpassword, specialization, availability, consultationFees ,cv , working_days} = userData;

  if (password !== Cpassword) {
    throw new AppError('Passwords do not match!', 400);
  }

  const oldDoctor = await findDoctorByEmail(email);
  if (oldDoctor) {
    throw new AppError('Account already exists!', 400);
  }

  const hashPass = await bcrypt.hash(password, 12);
  const newDoctor = {
    userName,
    email,
    password: hashPass,
    specialization,
    availability,
    consultationFees,
    cv,
    working_days
  };

  const savedDoctor = await createDoctor(newDoctor);
  const token = GenerateToken({ email: savedDoctor.email, id: savedDoctor._id });
  savedDoctor.token = token;

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

export { registerDoctor, loginDoctor, updateDoctorProfile, uploadDoctorCV };
