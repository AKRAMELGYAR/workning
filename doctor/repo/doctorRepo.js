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

const findDoctorsByName = async (name) => {
  try {console.log(name)
    const doctors = await Doctor.find()
      .populate({ path: 'user', match: { userName: { $regex: name, $options: 'i' } }}).lean() 
    return doctors.filter(doctor => doctor.user).map(doctor => ({
      id: doctor._id,
      userName: doctor.user.userName,
      email: doctor.user.email,
      specialization: doctor.specialization?.name,
      locations: doctor.locations,
      consultationFees: doctor.consultationFees,
      isVerified: doctor.isVerified
    }));
  } catch (error) {
    throw new Error(`Failed to search doctors: ${error.message}`);
  }
};

export { findDoctorByEmail, findDoctorById, createDoctor, updateDoctor, updateDoctorCV , findDoctorsByName };
