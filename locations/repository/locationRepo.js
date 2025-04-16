import {Location}  from '../model/locationModel.js';

// Find a location by name (case-insensitive)
export const findLocationByName = async (name) => {
    return Location.findOne({ name: name.toUpperCase() });
};

// Find a location by ID
export const findLocationById = async (id) => {
    return Location.findById(id);
};

// Add a new location with duplicate handling
export const addLocation = async (locationData) => {
    try {
        locationData.name = locationData.name.toUpperCase();
        const location = new Location(locationData);
        await location.save();
        return location;
    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error
            return Location.findOne({ name: locationData.name });
        }
        throw error;
    }
};

// Delete a location by ID
export const deleteLocationById = async (id) => {
    return Location.findByIdAndDelete(id);
};