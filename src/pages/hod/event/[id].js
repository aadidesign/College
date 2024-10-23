// src/pages/hod/event/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function HODEventDetails() {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) return;
        async function fetchEvent() {
            const response = await axios.get(`/api/hod/event/${id}`);
            setEvent(response.data);
            setLoading(false);
        }
        fetchEvent();
    }, [id]);

    const handleApproval = async (action) => {
        const response = await axios.post('/api/hod/event/approve', { eventId: id, action });
        if (response.status === 200) {
            router.push('/hod/dashboard');
        }
    };

    if (loading || !event) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Event: {event.title}</h1>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <h2 className="text-xl font-semibold mb-2">Requested Resources</h2>
            <ul>
                {event.resources.map((resource, index) => (
                    <li key={index}>{resource.name} - {resource.quantity}</li>
                ))}
            </ul>
            <div className="mt-4">
                <button className="btn btn-success mr-2" onClick={() => handleApproval('approve')}>Approve</button>
                <button className="btn btn-danger" onClick={() => handleApproval('reject')}>Reject</button>
            </div>
        </div>
    );
}
