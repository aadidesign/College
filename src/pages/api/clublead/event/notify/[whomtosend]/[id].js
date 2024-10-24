// src/pages/api/club-lead/event/notify/[id].js
import dbConnect from '../../../../lib/dbConnect';
import Event from '../../../../models/Event';
import User from '../../../../models/User';
import sendEmail from '../../../../lib/sendEmail';
import Student from 'root/pages/api/models/Student';

export default async function handler(req, res) {
    const { id, whomtosend } = req.query;

    await dbConnect();
    if (whomtosend !== 'students') {
        if (req.method === 'POST') {

            const { departments, years } = req.body;

            try {
                const event = await Event.findById(id);
                if (!event) {
                    return res.status(404).json({ message: 'Event not found' });
                }

                // Find students based on the selected departments and years
                const students = await Student.find({
                    department: { $in: departments },
                    year: { $in: years },
                    role: 'student',
                });

                // Send email to each student
                students.forEach(student => {
                    const registerLink = `${process.env.NEXTAUTH_URL}/event/register/${event._id}`;
                    sendEmail(student.email, 'New Event: ' + event.title, `
                    Hi ${student.name},
                    You are invited to register for the event ${event.title}. Click the link below to register:
                    ${registerLink}
                `);
                });

                res.status(200).json({ message: 'Notifications sent successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Server error', error });
            }
        }
    } else {
        const { user, event } = req.body;

            try {
                const event = await Event.findById(id);
                if (!event) {
                    return res.status(404).json({ message: 'Event not found' });
                }

                // Find students based on the selected departments and years
                const students = await User.find({
                    department: { $in: user },
                    role: 'user',
                });

                // Send email to each student
                students.forEach(student => {
                    const notifyFUser = `${process.env.NEXTAUTH_URL}/event/approval/${event._id}`;
                    sendEmail(whomtosend, 'New Event: ' + event.title, `
                    Hi ${student.name},
                    You are invited to check theregister event ${event.title}. Click the link below to check:
                    ${notifyFUser}
                `);
                });

                res.status(200).json({ message: 'Notifications sent successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Server error', error });
            }
    }
}
