// src/pages/certificate/[eventId]/[studentId].js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { jsPDF } from 'jspdf';

export default function Certificate() {
    const [event, setEvent] = useState(null);
    const [student, setStudent] = useState(null);
    const router = useRouter();
    const { eventId, studentId } = router.query;

    useEffect(() => {
        async function fetchData() {
            const eventResponse = await axios.get(`/api/event/${eventId}`);
            const studentResponse = await axios.get(`/api/student/${studentId}`);
            setEvent(eventResponse.data);
            setStudent(studentResponse.data);
        }
        fetchData();
    }, [eventId, studentId]);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text(`Certificate of Participation`, 20, 20);
        doc.text(`This is to certify that ${student.name}`, 20, 40);
        doc.text(`has successfully participated in the event ${event.title}.`, 20, 60);
        doc.save('certificate.pdf');
    };

    if (!event || !student) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Participation Certificate</h1>
            <p>This is to certify that <strong>{student.name}</strong> has successfully participated in the event <strong>{event.title}</strong>.</p>
            <button onClick={downloadPDF} className="btn btn-primary mt-4">Download Certificate</button>
        </div>
    );
}
