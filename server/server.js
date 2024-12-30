import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;
const MongoURL = process.env.MONGO_URL;

// Use CORS middleware to allow requests from any origin
app.use(cors());

app.use(express.json());
app.use('/api/users', userRoutes);

mongoose.connect(MongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});