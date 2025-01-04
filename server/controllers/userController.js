import User from '../models/user.js';
import bcrypt from 'bcrypt';

// Function to create a new user
export const createUser = async (req, res) => {
    const { username, email, password, name, dob } = req.body;
    console.log('Received data:', { username, email, password, name, dob }); // Log received data
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword); // Log hashed password
        const newUser = new User({ username, email, password: hashedPassword, name, dob });
        await newUser.save();
        console.log('New user created:', newUser); // Log new user
        res.status(201).send('User created successfully');
    } catch (err) {
        console.error('Error creating user:', err.message); // Log error
        res.status(500).send('Error creating user: ' + err.message);
    }
};

// Function to log in a user using username or email
export const loginUser = async (req, res) => {
    const { identifier, password } = req.body;
    try {
        // Check if the identifier is an email or username
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
        const user = isEmail ? await User.findOne({ email: identifier }) : await User.findOne({ username: identifier });

        if (!user) {
            return res.status(400).send('Invalid username/email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid username/email or password');
        }

        res.status(200).send('Login successful');
    } catch (err) {
        res.status(500).send('Error logging in: ' + err.message);
    }
};