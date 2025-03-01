import  mongoose from 'mongoose'

export const enumRole = {
    patient: 'patient',
    doctor: 'doctor',
    admin: 'admin'
}
export const enumStatus = {
    binding: 'binding',
    aproved: 'aproved',
}

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [15, "Username must be at most 20 characters long"],
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        unique: true,
        sparse: true,
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character'],
    },

    role: {
        type: String,
        enum: Object.values(enumRole),
        default: enumRole.patient
    },
     
});

const user =  mongoose.model('User', userSchema);
export default user;