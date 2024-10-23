// src/pages/api/events/[eventId].js
import dbConnect from '../../../../lib/dbConnect';
import Event from '../../../../models/Event';

export default async function handler(req, res) {
    await dbConnect();
    const { eventId } = req.query;

    if (req.method === 'DELETE') {
        try {
            await Event.findByIdAndDelete(eventId); // Delete the event
            res.status(204).end(); // No content response
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting event' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
