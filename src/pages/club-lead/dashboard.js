// src/pages/club-lead/dashboard.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function ClubLeadDashboard() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            const response = await axios.get('http://localhost:3000/api/club-lead/events');
            setEvents(response.data);
            setLoading(false);
        }
        fetchEvents();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Club Lead Dashboard</h1>
            <h2 className="text-xl font-semibold mb-4">Manage Your Events</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event._id}>
                            <td>{event.title}</td>
                            <td>{event.status}</td>
                            <td>
                                <Link href={`/club-lead/event/${event._id}`}>
                                    <button className="btn btn-primary">Manage</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
