import dbConnect from '../lib/dbConnect'; // Your database connection utility
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export default async function handler(req, res) {
    await dbConnect(); // Ensure the database connection

    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Regex for PCCOE email validation
        const pccoeEmailRegex = /^[a-zA-Z0-9._%+-]+@pccoepune\.org$/;

        // Signup
        if (req.body.action === 'signup') {
            try {
                // Validate email
                if (!pccoeEmailRegex.test(email)) {
                    return res.status(400).json({ message: 'Invalid email format. Please use a PCCOE email address.' });
                }

                // Check if user already exists
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ message: 'User already exists' });
                }

                // Hash password
                const hashedPassword = await bcrypt.hash(password, 10);
                
                // Create user
                const user = new User({ email, password: hashedPassword });
                await user.save();

                return res.status(201).json({ message: 'User created successfully' });
            } catch (error) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }

        // Login
        if (req.body.action === 'login') {
            try {
                // Find user
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(401).json({ message: 'Invalid email or password' });
                }

                // Check password
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid email or password' });
                }

                // Create token
                const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

                return res.status(200).json({ message: 'Login successful', token });
            } catch (error) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }

        return res.status(400).json({ message: 'Invalid action' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
