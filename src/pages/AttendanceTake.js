// pages/AttendanceTake.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AttendanceTake() {
  const router = useRouter();
  const { title, date, batch } = router.query; // To get class details passed in the URL query

  // Sample list of students (you can replace this with your actual student list)
  const initialStudents = [
    { name: 'John Doe', prn: '123456', status: 'Absent' },
    { name: 'Jane Smith', prn: '654321', status: 'Absent' },
    { name: 'Michael Johnson', prn: '987654', status: 'Absent' },
  ];

  const [students, setStudents] = useState(initialStudents);

  // Function to toggle attendance status
  const toggleAttendance = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].status = updatedStudents[index].status === 'Absent' ? 'Present' : 'Absent';
    setStudents(updatedStudents);
  };

  // Function to handle the submission of attendance
  const handleSubmit = () => {
    // Logic for handling attendance submission (e.g., save to a database or generate PDF)
    // Redirect back to the main page once done
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-semibold mb-4">Take Attendance</h1>
      <p className="text-lg">Class: {title}</p>
      <p className="text-md">Date: {date}</p>
      <p className="text-md">Batch: {batch}</p>

      {/* Students List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Students</h2>
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border">PRN</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.prn} className="border-t">
                <td className="px-4 py-2 border">{student.prn}</td>
                <td className="px-4 py-2 border">{student.name}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => toggleAttendance(index)}
                    className={`py-1 px-4 rounded-lg ${
                      student.status === 'Present'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {student.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
}
