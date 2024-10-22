import dbConnect from '../lib/dbConnect';
import Event from 'root/pages/api/models/Event';
import { verifyAuth } from 'root/pages/middlewares/verifyAuth'; // Import the middleware

async function handler(req, res) {
    await dbConnect(); // Ensure the database connection

    if (req.method === 'POST') {
        const { title, description, date, venue_id } = req.body;

        try {
            // Create new Event
            const event = new Event({
                title,
                description,
                date,
                venue_id,
                organizer_id: req.role, // Get the organizer_id from the authenticated user's role
            });

            await event.save();

            return res.status(201).json({ message: 'Event created successfully', event });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}

// Apply the authentication middleware
export default verifyAuth(handler);
