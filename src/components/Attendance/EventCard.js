// components/Attendance/EventCard.js
import { useRouter } from 'next/router';

export default function EventCard({ title, location, time, date, status, attendanceTaken, takeAttendance }) {
  const router = useRouter();

  const handleTakeAttendance = () => {
    // Navigate to AttendanceTake page, passing event info as query parameters
    router.push({
      pathname: '/AttendanceTake',
      query: {
        title,
        location,
        date,
      },
    });
    // Optionally, mark attendance as taken here
    if (takeAttendance) {
      takeAttendance();
    }
  };

  return (
    <div className="bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{location}</p>
      <p className="text-sm text-gray-500">{date} at {time}</p>
      <p className="text-sm text-gray-500">Status: {status}</p>

      {!attendanceTaken ? (
        <button
          onClick={handleTakeAttendance}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Mark Attendance
        </button>
      ) : (
        <p className="mt-4 text-blue-600">Attendance Taken</p>
      )}
    </div>
  );
}
