import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema= new mongoose.Schema({

email:{

    type:String,
    require:true,
    unique:true
 },
 password:{
 
    type:String,
    
 },
 googleId:{

    type:String,

 },
 Fullname:{
firstname:{
    type:String,
required:true
},
lastname:{

    type:String

}

 },
 role:{

    type:String,
    
 }





},{timestamps:true});


UserSchema.pre("save", async function (next) {
  try {
    // Only hash if password exists AND has been modified
    if (this.password && typeof this.password === "string" && this.password.length > 0  && this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 14);
    }
    next();
  } catch (err) {
    next(err);
  }
});


UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}





export const User = mongoose.model("User", UserSchema);