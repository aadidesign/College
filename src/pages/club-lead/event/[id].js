// src/pages/club-lead/event/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function ManageEvent() {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        venue: '',
        faq: '',
        details: ''
    });
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) return;
        async function fetchEvent() {
            const response = await axios.get(`/api/club-lead/event/${id}`);
            setEvent(response.data);
            setFormData({
                venue: response.data.venue || '',
                faq: response.data.faq || '',
                details: response.data.details || ''
            });
            setLoading(false);
        }
        fetchEvent();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        await axios.put(`/api/club-lead/event/${id}`, formData);
        router.push('/club-lead/dashboard');
    };

    const handlePublish = async () => {
        await axios.post(`/api/club-lead/event/publish/${id}`);
        router.push('/club-lead/dashboard');
    };

    if (loading || !event) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Event: {event.title}</h1>
            <form onSubmit={handleUpdate}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Venue</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={formData.venue}
                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">FAQ</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        value={formData.faq}
                        onChange={(e) => setFormData({ ...formData, faq: e.target.value })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Event Details</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update Event</button>
            </form>
            <div className="mt-4">
                <button className="btn btn-success" onClick={handlePublish}>Publish Event</button>
            </div>
        </div>
    );
}
