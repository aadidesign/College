import dbConnect from '../lib/dbConnect';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;  // Ensure salt rounds are configurable

export default async function handler(req, res) {
    // Ensure database connection
    await dbConnect();

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, password, first_name, last_name, action, role } = req.body;

    // Validate request body
    if (!email || !password || !action) {
        return res.status(400).json({ message: 'Email, password, and action are required' });
    }

    // Regex for PCCOE email validation
    const pccoeEmailRegex = /^[a-zA-Z0-9._%+-]+@pccoepune\.org$/;

    try {
        // Signup action
        if (action === 'signup') {
            // Validate PCCOE email format
            if (!pccoeEmailRegex.test(email)) {
                return res.status(400).json({ message: 'Invalid email format. Please use a PCCOE email address.' });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: 'User already exists' }); // Conflict status
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            // Create user
            const newUser = new User({
                first_name,
                last_name,
                email,
                password: hashedPassword,
                role
            });
            await newUser.save();

            return res.status(201).json({ message: 'User created successfully' });
        }

        // Login action
        if (action === 'login') {
            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id, userRole: user.role },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.status(200).json({ message: 'Login successful', token });
        }

        return res.status(400).json({ message: 'Invalid action' });
    } catch (error) {
        console.error('Error in authentication handler:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
