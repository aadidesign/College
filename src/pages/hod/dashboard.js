// src/pages/hod/dashboard.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function HODDashboard() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            const response = await axios.get('/api/hod/events');
            setEvents(response.data);
            setLoading(false);
        }
        fetchEvents();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">HOD Dashboard</h1>
            <h2 className="text-xl font-semibold mb-4">Pending Event Approvals</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event._id}>
                            <td>{event.title}</td>
                            <td>{event.status}</td>
                            <td>{new Date(event.date).toLocaleDateString()}</td>
                            <td>
                                <Link href={`/hod/event/${event._id}`}>
                                    <button className="btn btn-primary">View Details</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
