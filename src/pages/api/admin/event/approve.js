// src/pages/api/admin/event/approve.js
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
            event.status = 'approved_by_admin';
        } else if (action === 'reject') {
            event.status = 'rejected';
        }

        await event.save();

        // Notify the Club Lead and HOD
        const clubLead = await User.findById(event.clubLead);
        const hod = await User.findById(event.hod);

        sendEmail(clubLead.email, 'Event Approval Update', `Your event ${event.title} has been ${action}ed by Admin.`);
        sendEmail(hod.email, `Event: ${event.title} requires your approval`, `Please review the event in your dashboard.`);

        res.status(200).json({ message: `Event ${action}ed successfully`, event });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
