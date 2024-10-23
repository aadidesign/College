// src/utils/sendEmail.js
import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, text }) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // email address
            pass: process.env.EMAIL_PASS  // email password
        }
    });

    await transporter.sendMail({
        from: '"PCCOE Events" <events@pccoepune.ac.in>',
        to,
        subject,
        text
    });
};
