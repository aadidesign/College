// src/pages/api/club-lead/event/attendance/[id].js
import dbConnect from '../../../../lib/dbConnect';
import Event from '../../../../models/Event';
import User from '../../../../models/User';
import { parse } from 'csv-parse';
import fs from 'fs';
import path from 'path';
import sendEmail from '../../../../lib/sendEmail';

export default async function handler(req, res) {
    const { id } = req.query;

    await dbConnect();

    if (req.method === 'POST') {
        try {
            const file = req.files.file;
            const filePath = path.join(process.cwd(), 'uploads', file.name);
            await fs.promises.writeFile(filePath, file.data);

            // Read the CSV file
            const attendees = [];
            const parser = fs.createReadStream(filePath).pipe(parse({ columns: true }));

            parser.on('data', (row) => {
                attendees.push(row.email);
            });

            parser.on('end', async () => {
                const event = await Event.findById(id);
                if (!event) {
                    return res.status(404).json({ message: 'Event not found' });
                }

                // Send certificates to attendees
                for (const email of attendees) {
                    const student = await User.findOne({ email });
                    if (student) {
                        const certificateLink = `${process.env.NEXTAUTH_URL}/certificate/${event._id}/${student._id}`;
                        sendEmail(student.email, 'Participation Certificate', `
                            Hi ${student.name},
                            Congratulations! You have participated in the event ${event.title}.
                            Download your participation certificate from the following link:
                            ${certificateLink}
                        `);
                    }
                }

                res.status(200).json({ message: 'Attendance uploaded and certificates sent' });
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
}
