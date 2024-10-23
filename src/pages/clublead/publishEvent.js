// src/pages/clublead/publishEvent.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PublishEvent({ eventId }) {
    const [departments, setDepartments] = useState([]);
    const [years, setYears] = useState(['First Year', 'Second Year', 'Third Year', 'Final Year']);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedYears, setSelectedYears] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchDepartments() {
            const response = await axios.get('/api/departments');
            setDepartments(response.data);
        }
        fetchDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('/api/events/publish', {
                eventId,
                selectedDepartments,
                selectedYears
            });
            alert('Event published and students notified!');
        } catch (error) {
            console.error(error);
            alert('Error publishing event.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Publish Event</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Select Departments:</label>
                    <select multiple className="w-full p-2" onChange={(e) => setSelectedDepartments([...e.target.selectedOptions].map(opt => opt.value))}>
                        {departments.map(department => (
                            <option key={department._id} value={department.name}>{department.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Select Years:</label>
                    <select multiple className="w-full p-2" onChange={(e) => setSelectedYears([...e.target.selectedOptions].map(opt => opt.value))}>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Publishing...' : 'Publish Event'}
                </button>
            </form>
        </div>
    );
}
