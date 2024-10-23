// src/pages/api/events/[eventId]/registrations.js
import dbConnect from '../../../../lib/dbConnect';
import Event from '../../../../models/Event';

export default async function handler(req, res) {
    await dbConnect();
    const { eventId } = req.query;

    if (req.method === 'GET') {
        try {
            const event = await Event.findById(eventId).populate('attendees'); // Populate attendees with registration data
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            res.status(200).json(event.attendees); // Return the list of registered students
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching registrations' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
