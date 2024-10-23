// src/pages/club-lead/certificates.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Certificates() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axios.get('/api/events'); // Fetch events for the Club Lead
            setEvents(response.data);
        };
        fetchEvents();
    }, []);

    const handleEventChange = async (eventId) => {
        setSelectedEvent(eventId);
        const response = await axios.get(`/api/events/${eventId}/registrations`); // Fetch registrations for selected event
        setStudents(response.data);
    };

    const generateCertificates = async () => {
        // Logic to generate certificates
        for (const student of students) {
            // Here you can implement your logic for generating certificates, like using a PDF library
            console.log(`Generating certificate for ${student.name}`);
        }
        alert('Certificates generated successfully!');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Generate Participation Certificates</h1>
            <div className="mb-4">
                <label className="block text-gray-700">Select Event:</label>
                <select
                    onChange={(e) => handleEventChange(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select an event</option>
                    {events.map((event) => (
                        <option key={event._id} value={event._id}>
                            {event.title}
                        </option>
                    ))}
                </select>
            </div>
            {selectedEvent && (
                <div>
                    <h2 className="text-xl mb-2">Registered Students</h2>
                    <ul className="mb-4">
                        {students.map((student) => (
                            <li key={student._id}>{student.name} - {student.email}</li>
                        ))}
                    </ul>
                    <button className="btn btn-primary" onClick={generateCertificates}>
                        Generate Certificates
                    </button>
                </div>
            )}
        </div>
    );
}
