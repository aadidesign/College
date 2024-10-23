// src/pages/api/student/events.js
import dbConnect from '../../../lib/dbConnect';
import Event from '../../../models/Event';
import User from '../../../models/User';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    await dbConnect();

    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const student = await User.findOne({ email: session.user.email });
        const events = await Event.find({ attendees: student._id }).lean();

        const eventsWithStatus = events.map(event => ({
            ...event,
            participationStatus: event.attendees.includes(student._id) ? 'Attended' : 'Registered',
            studentId: student._id
        }));

        res.status(200).json(eventsWithStatus);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
