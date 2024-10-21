// components/Attendance/ClassCard.js
import { useRouter } from 'next/router';

export default function ClassCard({ title, batch, time, date, status, attendanceTaken, takeAttendance }) {
  const router = useRouter();

  const handleTakeAttendance = () => {
    // Navigate to AttendanceTake page, passing class info as query parameters
    router.push({
      pathname: '/AttendanceTake',
      query: {
        title,
        batch,
        date
      }
    });
    // Optionally, you can mark attendance as taken here
    if (takeAttendance) {
      takeAttendance();
    }
  };

  return (
    <div className="bg-white p-4 border rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{batch}</p>
      <p className="text-sm text-gray-500">{date} at {time}</p>
      <p className="text-sm text-gray-500">Status: {status}</p>

      {!attendanceTaken ? (
        <button
          onClick={handleTakeAttendance}
          className="mt-4 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Take Attendance
        </button>
      ) : (
        <p className="mt-4 text-green-600">Attendance Taken</p>
      )}
    </div>
  );
}
