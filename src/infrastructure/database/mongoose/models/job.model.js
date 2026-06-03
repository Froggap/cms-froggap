import mongoose from 'mongoose';

export const jobSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    position: { type: String, required: true },
    active: { type: Boolean, default: true },
    socialLinks: [
        {
            icon: { type: String, required: true },
            url: { type: String, required: true },
            name: { type: String, required: true}
        }
    ],  
},{timestamps: true});

export default mongoose.model('Job', jobSchema);