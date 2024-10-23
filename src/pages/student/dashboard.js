// src/pages/student/dashboard.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function StudentDashboard() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            const response = await axios.get('/api/student/events');
            setEvents(response.data);
        }
        fetchEvents();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Events</h1>
            {events.length === 0 ? (
                <p>No events found.</p>
            ) : (
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Event Name</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event._id}>
                                <td className="border px-4 py-2">{event.title}</td>
                                <td className="border px-4 py-2">
                                    {event.participationStatus}
                                </td>
                                <td className="border px-4 py-2">
                                    {event.participationStatus === 'Attended' && (
                                        <Link href={`/certificate/${event._id}/${event.studentId}`}>
                                            <a className="btn btn-primary">Download Certificate</a>
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
