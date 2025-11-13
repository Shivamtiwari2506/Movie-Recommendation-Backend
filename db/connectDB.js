import mongoose from "mongoose";


const connectDB = async()=>{
   try{
      await mongoose.connect(process.env.MONGO_URI).then((res)=>{
         console.log("Connected to DB");
      })
   }
   catch(err){
      console.log(err);
   }
}

export default connectDB