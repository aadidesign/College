import mongoose from 'mongoose';
import Application from '../../../models/Application'
import dbConnect from 'root/pages/api/lib/dbConnect';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    const { title, description, venue_id, date, time, inventory_id, additional_details } = req.body;

    switch (method) {
        case 'POST':
            try {
                const event = await Application.create({
                    application_type:"event_permission",
                    title,
                    description,
                    venue_id,
                    date: new Date(date + ' ' + time),
                    inventory_id,
                    additional_details,
                    applicant: "6716c28a151078875c9fea9f"
                });
                res.status(201).json({ success: true, data: event });
            } catch (error) {
                res.status(400).json({ success: false, err:error.message });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}