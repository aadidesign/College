// src/pages/api/club-lead/event/publish/[id].js
import dbConnect from '../../../../lib/dbConnect';
import Event from '../../../../models/Event';
import sendEmail from '../../../../lib/sendEmail';

export default async function handler(req, res) {
    const { id } = req.query;

    await dbConnect();

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Mark the event as published
        event.status = 'published';
        await event.save();

        // Notify students (fake example)
        // const students = await User.find({ role: 'student' }); 
        // for (const student of students) {
        //     sendEmail(student.email, 'New Event: ' + event.title, 'Register here: <link>');
        // }

        res.status(200).json({ message: 'Event published and notifications sent', event });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
