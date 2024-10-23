// src/pages/api/event/[eventId]/certificate/[studentId].js
import dbConnect from '../../../../../lib/dbConnect';
import Event from '../../../../../models/Event';
import User from '../../../../../models/User';

export default async function handler(req, res) {
    const { eventId, studentId } = req.query;

    await dbConnect();

    try {
        const event = await Event.findById(eventId);
        const student = await User.findById(studentId);

        if (!event || !student) {
            return res.status(404).json({ message: 'Event or student not found' });
        }

        res.status(200).json({ event, student });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
