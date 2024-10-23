// src/pages/api/events/publish.js
import dbConnect from '../../../lib/dbConnect';
import Event from '../../../models/Event';
import User from '../../../models/User';
import { sendEmail } from '../../../utils/sendEmail';

export default async function handler(req, res) {
    await dbConnect();

    const { eventId, selectedDepartments, selectedYears } = req.body;

    try {
        const event = await Event.findById(eventId);
        const students = await User.find({
            role: 'student',
            department: { $in: selectedDepartments },
            year: { $in: selectedYears }
        });

        // Send notification emails
        students.forEach(student => {
            sendEmail({
                to: student.email,
                subject: `New Event: ${event.title}`,
                text: `Dear ${student.name},\n\nYou are invited to register for the event: ${event.title}. Click the link below to register:\n\n[Registration Link]\n\nThank you!`
            });
        });

        event.published = true;
        await event.save();

        res.status(200).json({ message: 'Event published and students notified' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error publishing event' });
    }
}
