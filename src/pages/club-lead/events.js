// src/pages/club-lead/events.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function ClubLeadEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axios.get('http://localhost:3000/api/events'); // Fetch events created by the club lead
            setEvents(response.data);
        };
        fetchEvents();
    }, []);

    const deleteEvent = async (eventId) => {
        if (confirm('Are you sure you want to delete this event?')) {
            await axios.delete(`/api/events/${eventId}`); // Delete the event
            setEvents(events.filter((event) => event._id !== eventId));
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Events</h1>
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="border">Event Title</th>
                        <th className="border">Status</th>
                        <th className="border">Attendees</th>
                        <th className="border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event._id}>
                            <td className="border">{event.title}</td>
                            <td className="border">{event.status}</td>
                            <td className="border">{event.attendees.length}</td>
                            <td className="border">
                                <Link href={`/club-lead/edit-event/${event._id}`}>
                                    <button className="btn btn-secondary">Edit</button>
                                </Link>
                                <button className="btn btn-danger" onClick={() => deleteEvent(event._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
