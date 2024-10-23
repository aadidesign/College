// src/pages/api/events/department-approve.js
import dbConnect from '../../../lib/dbConnect';
import Event from '../../../models/Event';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    const { eventId, action, rejectionReason } = req.body;

    try {
        await dbConnect();

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (action === 'approve') {
            event.status = 'approved_by_department';
        } else if (action === 'reject') {
            event.status = 'rejected';
            event.rejectionReason = rejectionReason;
        }

        await event.save();

        // Send email notifications
        // sendEmailNotification(departmentEmail, eventDetails);
        // sendEmailNotification(clubLeadEmail, eventDetails);

        res.status(200).json({ message: `Event ${action}ed successfully`, event });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
