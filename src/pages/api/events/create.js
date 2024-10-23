// src/pages/api/events/create.js
import dbConnect from '../../../lib/dbConnect';
import Event from '../../../models/Event';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    const { title, description, date, resources, clubLeadId } = req.body;

    try {
        await dbConnect();

        const newEvent = new Event({
            title,
            description,
            date,
            clubLead: clubLeadId,
            resources,
        });

        await newEvent.save();

        // Send email notification to Faculty
        // sendEmailNotification(facultyEmail, eventDetails);

        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
