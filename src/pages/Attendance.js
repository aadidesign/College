// pages/index.js
import { useState } from "react";
import ClassCard from "../components/Attendance/EventCard";
import Link from "next/link";

export default function Home() {
  // Sample classes data with `attendanceTaken` property
  const initialClasses = [
    {
      title: "How to Make an Array and it's Types in C++",
      batch: "Batch 3CO - JYY",
      time: "12:40 PM",
      date: "03 Jan 2023",
      status: "Completed",
      attendanceTaken: true,
    },
    {
      title: "Advanced Data Structures in C++",
      batch: "Batch 4CO - KLM",
      time: "10:00 AM",
      date: "10 Oct 2023",
      status: "Pending",
      attendanceTaken: false,
    },
    // Add more class data...
  ];

  const [classes, setClasses] = useState(initialClasses);

  // Function to take attendance
  const takeAttendance = (index) => {
    const updatedClasses = [...classes];
    updatedClasses[index].attendanceTaken = true;
    setClasses(updatedClasses);
  };

  // Filter classes based on attendance status
  const scheduledClasses = classes.filter(cls => !cls.attendanceTaken);
  const classHistory = classes.filter(cls => cls.attendanceTaken);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Hii, Devendra</h1>
        <Link href='/AttendanceTake'>
        <button  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
          take Attendance
        </button></Link>
      </header>

      {/* Navigation */}
      <nav className="flex space-x-4 mb-6">
        <button className="py-2 px-4 border-b-2 border-blue-500">Scheduled Classes</button>
        <button className="py-2 px-4 text-gray-500">Class History</button>
      </nav>

      {/* Scheduled Classes Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Scheduled Classes</h2>
        {scheduledClasses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {scheduledClasses.map((cls, index) => (
              <ClassCard
                key={index}
                {...cls}
                takeAttendance={() => takeAttendance(index)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No scheduled classes</p>
        )}
      </section>

      {/* Class History Section */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Class History</h2>
        {classHistory.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {classHistory.map((cls, index) => (
              <ClassCard key={index} {...cls} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No classes in history</p>
        )}
      </section>
    </div>
  );
}
