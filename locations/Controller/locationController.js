import { createLocation, getLocationByName, getLocationById, removeLocationById } from '../services/locationService.js';

export const addLocationController = async (req, res) => {
    try {
        const location = await createLocation(req.body);
        res.status(201).json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLocationByNameController = async (req, res) => {
    try {
        const location = await getLocationByName(req.params.name);
        if (!location) return res.status(404).json({ message: 'Location not found' });
        res.json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLocationByIdController = async (req, res) => {
    try {
        const location = await getLocationById(req.params.id);
        if (!location) return res.status(404).json({ message: 'Location not found' });
        res.json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteLocationController = async (req, res) => {
    try {
        const result = await removeLocationById(req.params.id);
        if (!result) return res.status(404).json({ message: 'Location not found' });
        res.json({ message: 'Location deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
