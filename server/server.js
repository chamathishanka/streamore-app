import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;
const MongoURL = process.env.MONGO_URL;

app.use(express.json());
app.use('/api/users', userRoutes);

mongoose.connect(MongoURL).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log(err);
});