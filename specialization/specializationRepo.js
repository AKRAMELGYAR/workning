import Specialization from "./SpecializationModel.js";

const createSpecialization = async (name) => {
    const specialization = new Specialization({ name });
    return await specialization.save();
};

const findByName = async (name) => {
    return await Specialization.findOne({ name });
};

export  {  
    createSpecialization, 
    findByName
};
