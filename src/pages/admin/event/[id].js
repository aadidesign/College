// src/pages/admin/event/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function EventDetails() {
    const [event, setEvent] = useState(null);
    const [resources, setResources] = useState([]);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) return;
        async function fetchEvent() {
            const response = await axios.get(`/api/admin/event/${id}`);
            setEvent(response.data.event);
            setResources(response.data.resources);
        }
        fetchEvent();
    }, [id]);

    const handleApproval = async (action) => {
        const response = await axios.post('/api/admin/event/approve', { eventId: id, action });
        if (response.status === 200) {
            router.push('/admin/dashboard');
        }
    };

    if (!event) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Event: {event.title}</h1>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <h2 className="text-xl font-semibold mb-2">Requested Resources</h2>
            <ul>
                {resources.map((resource, index) => (
                    <li key={index}>{resource}</li>
                ))}
            </ul>
            <div className="mt-4">
                <button className="btn btn-success mr-2" onClick={() => handleApproval('approve')}>Approve</button>
                <button className="btn btn-danger" onClick={() => handleApproval('reject')}>Reject</button>
            </div>
        </div>
    );
}
