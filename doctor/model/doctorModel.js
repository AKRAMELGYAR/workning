import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String },
  availability: { type: String },
  working_days : {type : Number } ,
  consultationFees: { type: Number },
  cv: { type: String , required : true }, 
  isVerified: { type: Boolean, default: false },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;