import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    address: { type: String },
    phone: { type: String, unique: true },
    dni: { type: Number, unique: true },
    status: {
        type: String,
        enum: ['doxeado', 'no doxeado'],
        required: true
    },
    riskLevel: {
        type: String,
        enum: ['alto', 'medio', 'bajo'],
        required: true
    },
    profileImage: {
        type: String, 
        default: null 
    }
}, { timestamps: true });

export default mongoose.model('Account', accountSchema);
