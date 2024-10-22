import { v4 as uuidv4 } from 'uuid';  // To generate a unique token
import nodemailer from 'nodemailer';
import dbConnect from '../../lib/dbConnect';
import Application from '../../models/Application';

export default async function handler(req, res) {
    await dbConnect(); // Ensure the database connection

    if (req.method === 'POST') {
        const { applicantName, applicationData, inventory_id, venue_id, facultyEmail, departmentEmail } = req.body;

        // Generate a unique approval token
        const approvalToken = uuidv4();

        try {
            // Create a new application with the token
            const application = new Application({
                applicantName,
                applicationData,
                approvalToken,
                inventory_id,
                venue_id,
            });

            await application.save();

            // Generate approval link
            const approvalLink = `${process.env.BASE_URL}/api/application/approve/${approvalToken}`;

            // Setup nodemailer transporter for sending emails
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS,
                },
            });

            // Prepare email options for faculty
            const mailOptionsFaculty = {
                from: process.env.GMAIL_USER,
                to: facultyEmail,  // Send email to the faculty
                subject: 'Application Approval Request',
                text: `Dear Faculty,\n\nAn application has been created by ${applicantName}. Please review and approve using the link below:\n\n${approvalLink}\n\nThank you.`,
            };

            // Prepare email options for department
            const mailOptionsDepartment = {
                from: process.env.GMAIL_USER,
                to: departmentEmail,  // Send email to the department
                subject: 'Application Approval Request',
                text: `Dear Department,\n\nAn application has been created by ${applicantName}. Please review and approve using the link below:\n\n${approvalLink}\n\nThank you.`,
            };

            // Send the email to faculty
            await transporter.sendMail(mailOptionsFaculty);

            // Send the email to department
            await transporter.sendMail(mailOptionsDepartment);

            return res.status(201).json({
                message: 'Application created successfully and emails sent',
                approvalLink
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
