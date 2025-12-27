import mongoose from "mongoose";
const packageSchema=new mongoose.Schema({

title:{


    type:String,
    required:true,
    trim:true /// manali 3 d  4n to malani3d4n
},

description:{
type:String,
required:true




},
duration:{
days:{type: Number,  required: true},
nights:{type :Number,  required: true}


},
price:{

    type:Number,
    required: true,
},
status:{


    type:String,
    enum:["active","inactive"],

},
pyramidlevel:{
type:String,
required:true


}


},{timestamps:true});

export const Package=mongoose.model("Package",packageSchema);