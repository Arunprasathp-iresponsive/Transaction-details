import express from 'express';
import mongoose from 'mongoose';
import transactionRoute from './routes/transactionRoute';
import connectDB from "../src/config/moongodb";
import cors from 'cors';
import { errorHandler } from './middleware/errorhandlers';
const app = express();
const port = process.env.PORT || 3000;
app.use(cors())
// Middleware
app.use(express.json());

// Routes
app.use('/transaction', transactionRoute);

//Error Handlers
app.use(errorHandler);

// MongoDB connection
connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
