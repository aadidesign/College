// src/pages/api/club-lead/events.js
import dbConnect from '../lib/dbConnect';
import Event from '../../../models/Event';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        await dbConnect();

        const events = await Event.find({ clubLead: session.user.id, status: 'approved_by_hod' });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
