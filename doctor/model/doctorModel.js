import mongoose  from "mongoose";
import Specialization from "../../specialization/SpecializationModel.js";

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialization: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialization', 
    required: true 
  },
  consultationFees: { type: Number },
  cv: { type: String ,default:'uploads/cv.pdf'}, 
  isVerified: { type: Boolean, default: false },
  locations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,  
  }],
  addresses: [{
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true }
  }]
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;

