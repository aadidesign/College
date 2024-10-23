// src/pages/api/event/register/[id].js
import dbConnect from '../../../lib/dbConnect';
import Event from '../../../models/Event';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    const { id } = req.query;

    const session = await getSession({ req });
    if (!session || session.user.role !== 'student') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    await dbConnect();

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.attendees.includes(session.user.id)) {
            return res.status(400).json({ message: 'You are already registered for this event' });
        }

        event.attendees.push(session.user.id);
        await event.save();

        res.status(200).json({ message: 'Successfully registered for the event' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
