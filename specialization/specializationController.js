import * as specializationService from './specializationService.js';

const createSpecialization = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await specializationService.addSpecialization(name);
        res.status(201).json({ message: "Specialization created", data: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export {
    createSpecialization
};
