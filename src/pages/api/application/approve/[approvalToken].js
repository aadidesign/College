import { v4 as uuidv4 } from 'uuid'; // To generate a unique token
import nodemailer from 'nodemailer';
import dbConnect from '../../lib/dbConnect';
import Application from '../../models/Application';
import { sendMail } from '../../lib/sendMail'; // Assuming you have a reusable sendMail function

export default async function handler(req, res) {
    await dbConnect(); // Ensure the database connection

    const { token } = req.query; // Get the token from the URL

    if (req.method === 'POST') {
        const { action, facultyEmail, departmentEmail, rejectReason } = req.body; // Action (approve/reject)

        try {
            // Find the application using the approval token
            const application = await Application.findOne({ approvalToken: token });

            if (!application) {
                return res.status(404).json({ message: 'Application not found' });
            }

            // Check if the application is already approved/rejected
            if (application.status !== 'pending') {
                return res.status(400).json({ message: 'Application has already been processed' });
            }

            // Update application status based on the action (approve or reject)
            if (action === 'approve') {
                application.approval_chain.faculty.is_approved = true;
                application.approval_chain.faculty.approved_at = new Date();

                // Check if all faculty members have approved
                const allFacultyApproved = application.approval_chain.faculty.every(approver => approver.is_approved);

                if (allFacultyApproved) {
                    application.status = 'approved'; // Mark application as approved
                }

                // Notify the faculty
                await sendMail({
                    to: facultyEmail,
                    title: `Application Approved: ${application.title}`,
                    message: `Your application titled '${application.title}' has been approved.`,
                });
            } else if (action === 'reject') {
                application.approval_chain.faculty.is_approved = false; // Mark faculty approval as false
                application.status = 'rejected'; // Mark application as rejected

                // Notify the faculty with the reject reason
                await sendMail({
                    to: facultyEmail,
                    title: `Application Rejected: ${application.title}`,
                    message: `Your application titled '${application.title}' was rejected. Reason: ${rejectReason || 'No reason provided.'}`,
                });
            }

            // Save the updated application status
            await application.save();

            return res.status(200).json({ message: `Application ${action}ed successfully` });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
