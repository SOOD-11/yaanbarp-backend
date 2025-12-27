import mongoose from "mongoose";

const ConnectToDatabase=async()=>{
try {
    
     await mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.DB}`).then(()=>{



   
    
     
   
    console.log("database connected to ",process.env.PORT);
    })
    
} catch (error) {
    console.log("database connection failed ");
    
}
 await mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.DB}`, {
  serverSelectionTimeoutMS: 60000, // 10 seconds
});
}
export default ConnectToDatabase; 