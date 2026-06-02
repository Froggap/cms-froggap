import mongoose from 'mongoose';

export const technologySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    technologies:[{
        name:{
            type:String,
            required:true
        },
        icon:{
            type:String,
            required:true
        },
        active:{
            type:Boolean,
            default:true
        }
    }],
    tags:[String],
    active:{
        type:Boolean,
        default:true
    }
})

export default mongoose.model('Technology', technologySchema); 