import moongose from "mongoose";

const MainSection = new moongose.Schema({
    title: {
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    rol:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true});

export default moongose.model('MainSection', MainSection);