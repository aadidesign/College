// src/pages/api/hod/event/approve.js
import dbConnect from '../../../../lib/dbConnect';
import Event from '../../../../models/Event';
import sendEmail from '../../../../lib/sendEmail';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    const { eventId, action } = req.body;

    try {
        await dbConnect();

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (action === 'approve') {
            event.status = 'approved_by_hod';
        } else if (action === 'reject') {
            event.status = 'rejected';
        }

        await event.save();

        // Notify Club Lead about the final status
        const clubLead = await User.findById(event.clubLead);
        sendEmail(clubLead.email, `Final Event Approval: ${event.title}`, `Your event has been ${action}ed by HOD.`);

        res.status(200).json({ message: `Event ${action}ed successfully`, event });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
