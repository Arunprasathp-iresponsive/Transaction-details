import express from 'express';
import mongoose from 'mongoose';
import transactionRoute from './routes/transactionRoute';
import connectDB from "../src/config/moongodb";
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/transaction', transactionRoute);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
connectDB();
// MongoDB connection
const mongoUri = 'mongodb://localhost:27017/payment';
mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    // app.listen(port, () => {
    //   console.log(`Server is running on port ${port}`);
    // });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
