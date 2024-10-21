import { verifyAuth } from 'root/pages/middlewares/verifyAuth';
import dbConnect from '../../../utils/dbConnect';
import Notification from '../../../models/Notification';
import nodemailer from 'nodemailer';

const mongoose = require('mongoose');
const User = require('../../../models/User');

async function handler(req, res) {
    await dbConnect(); // Ensure the database connection

    if (req.method === 'POST') {
        const { user_id, for_event, message } = req.body;

        try {
            const notification = new Notification({
                user_id,
                for_event,
                message
            });
            await notification.save();

            const user = await User.findById(user_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.GMAIL_USER,
                to: user.email, 
                subject: 'Notification for Event',
                text: message, 
            };

            // Send the email
            await transporter.sendMail(mailOptions);

            return res.status(201).json({ message: 'Notification created and email sent successfully', notification });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}

export default verifyAuth(handler);
