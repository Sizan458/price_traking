import mongoose from "mongoose";
let isConnected = false;
export const connecttoDB =  async()=>{
    mongoose.set('strictQuery', true);
    if(!process.env.MONGODB_URI) return  console.log('something went wrong to connect to MongoDB');
    if(isConnected) return console.log('=>using existing MongoDB connection');
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        isConnected = true;
        console.log('database connection established')
    }catch(error){
        console.log(error)
    }
}