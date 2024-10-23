// src/pages/club-lead/event/notify/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function NotifyStudents() {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYears, setSelectedYears] = useState([]);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        async function fetchData() {
            // Fetch departments and years from API
            const deptResponse = await axios.get('/api/departments');
            const yearResponse = await axios.get('/api/years');
            setDepartments(deptResponse.data);
            setYears(yearResponse.data);
        }
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`/api/club-lead/event/notify/${id}`, {
            departments: selectedDepartments,
            years: selectedYears,
        });
        router.push('/club-lead/dashboard');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Notify Students for Event</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Select Departments</label>
                    <select
                        multiple
                        className="select select-bordered w-full"
                        onChange={(e) => setSelectedDepartments([...e.target.selectedOptions].map(option => option.value))}
                    >
                        {departments.map(dept => (
                            <option key={dept._id} value={dept._id}>{dept.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Select Years</label>
                    <select
                        multiple
                        className="select select-bordered w-full"
                        onChange={(e) => setSelectedYears([...e.target.selectedOptions].map(option => option.value))}
                    >
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Send Notifications</button>
            </form>
        </div>
    );
}
