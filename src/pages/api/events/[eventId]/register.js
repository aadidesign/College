// src/pages/api/events/[eventId]/register.js
import dbConnect from '../../../../lib/dbConnect';
import Event from '../../../../models/Event';
import Registration from '../../../../models/Registration';

export default async function handler(req, res) {
    await dbConnect();
    const { eventId } = req.query;

    if (req.method === 'POST') {
        const { name, email } = req.body;

        try {
            // Create a new registration entry
            const registration = new Registration({ event: eventId, name, email });
            await registration.save();

            // Optionally, update the event with the registered students
            await Event.findByIdAndUpdate(eventId, { $push: { attendees: registration._id } });

            res.status(201).json({ message: 'Registration successful' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error registering for event' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
