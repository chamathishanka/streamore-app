import User from '../models/user.js';
import bcrypt from 'bcrypt';

// Function to create a new user
export const createUser = async (req, res) => {
    const { username, password, name, dob } = req.body;
    console.log('Received data:', { username, password, name, dob }); // Log received data
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword); // Log hashed password
        const newUser = new User({ username, password: hashedPassword, name, dob });
        await newUser.save();
        console.log('New user created:', newUser); // Log new user
        res.status(201).send('User created successfully');
    } catch (err) {
        console.error('Error creating user:', err.message); // Log error
        res.status(500).send('Error creating user: ' + err.message);
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('Invalid username or password');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid username or password');
        }
        res.status(200).send('Login successful');
    } catch (err) {
        res.status(500).send('Error logging in: ' + err.message);
    }
};