import Doctor from '../../doctor/model/doctorModel.js'

const findById = async(doctorId)=>{
    return await Doctor.findById(doctorId) 
}

const findByIdAndDelete = async(doctorId)=>{
    return await Doctor.findByIdAndDelete(doctorId) 
}

export  {
    findById,
    findByIdAndDelete
}