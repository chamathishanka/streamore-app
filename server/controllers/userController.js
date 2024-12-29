import User from '../models/user.js';
import bcrypt from 'bcrypt';


// Function to create a new user
export const createUser = async (req, res) => {
    const { username, password, country } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, country });
        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (err) {
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
