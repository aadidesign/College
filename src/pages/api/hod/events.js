// src/pages/api/hod/events.js
import dbConnect from '../../../lib/dbConnect';
import Event from '../../../models/Event';

export default async function handler(req, res) {
    try {
        await dbConnect();

        const events = await Event.find({ status: 'approved_by_admin' });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
