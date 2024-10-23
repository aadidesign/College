// src/pages/event/register/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function RegisterEvent() {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;
    const [registrationStatus, setRegistrationStatus] = useState('');

    useEffect(() => {
        if (!id) return;
        async function fetchEvent() {
            const response = await axios.get(`/api/event/${id}`);
            setEvent(response.data);
            setLoading(false);
        }
        fetchEvent();
    }, [id]);

    const handleRegister = async () => {
        await axios.post(`/api/event/register/${id}`);
        setRegistrationStatus('Successfully registered for the event!');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Register for Event: {event.title}</h1>
            <p className="mb-4">{event.description}</p>
            <button className="btn btn-primary" onClick={handleRegister}>Register</button>
            {registrationStatus && <p className="mt-4 text-green-500">{registrationStatus}</p>}
        </div>
    );
}
