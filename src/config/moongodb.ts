import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
dotenv.config();


const connectDB = async () => {
  try {
    const mongoURI: string = process.env.MONGODB_URL !;
    console.log("mongoURI---", mongoURI);
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;