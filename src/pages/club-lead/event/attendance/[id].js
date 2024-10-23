// src/pages/club-lead/event/attendance/[id].js
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function UploadAttendance() {
    const [file, setFile] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        await axios.post(`/api/club-lead/event/attendance/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        router.push('/club-lead/dashboard');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Upload Attendance for Event</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Attendance File</label>
                    <input type="file" className="input input-bordered w-full" onChange={handleFileChange} />
                </div>
                <button type="submit" className="btn btn-primary">Upload</button>
            </form>
        </div>
    );
}
