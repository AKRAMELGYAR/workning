import Doctor from '../model/doctorModel.js';


const findDoctorByEmail = async (email) => {
  return await Doctor.findOne({ email });
};

const findDoctorById = async (id) => {
  return await Doctor.findById(id);
};

const createDoctor = async (doctorData) => {
  const newDoctor = new Doctor(doctorData);
  return await newDoctor.save();
};

const updateDoctor = async (id, updateData) => {
  return await Doctor.findByIdAndUpdate({_id : id}, {$set : {...updateData}}, { new: true });
};

const updateDoctorCV = async (id, cvPath) => {
  console.log(id , cvPath)
  return await Doctor.updateOne({_id : id} , {$set : {cv : cvPath}} ,{new : true});
};

export { findDoctorByEmail, findDoctorById, createDoctor, updateDoctor, updateDoctorCV };
