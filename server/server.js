import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();  // Ensure this line is correctly executed

const PORT = process.env.PORT || 8000;
const MongoURL = process.env.MONGO_URL;

mongoose.connect(MongoURL).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
});
