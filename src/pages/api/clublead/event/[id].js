// src/pages/api/club-lead/event/[id].js
import dbConnect from '../../../../lib/dbConnect';
import Event from '../../../../models/Event';

export default async function handler(req, res) {
    const { id } = req.query;

    await dbConnect();

    if (req.method === 'GET') {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        return res.status(200).json(event);
    }

    if (req.method === 'PUT') {
        const { venue, faq, details } = req.body;

        const event = await Event.findByIdAndUpdate(id, { venue, faq, details }, { new: true });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        return res.status(200).json({ message: 'Event updated successfully', event });
    }
}
