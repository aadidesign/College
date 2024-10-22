import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaRegStar, FaBell, FaCalendarAlt, FaUserFriends, FaCommentDots, FaPlusCircle, FaMoon, FaSun, FaSearch, FaInfoCircle } from 'react-icons/fa';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

// Dummy data
const upcomingEvents = [
  { name: "Workshop on AI", date: "2024-10-25", time: "10:00 AM", status: "upcoming" },
  { name: "Cultural Fest", date: "2024-11-05", time: "05:00 PM", status: "upcoming" },
];

const participationData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Events Participated',
      data: [3, 2, 4, 5, 3, 6],
      fill: false,
      backgroundColor: 'rgba(56, 178, 172, 0.5)',
      borderColor: '#38B2AC',
      borderWidth: 3,
      tension: 0.3,
    },
  ],
};

const notifications = [
  { message: "New event registration opens tomorrow!", isNew: true },
  { message: "Feedback for the last event is due soon.", isNew: false },
];

const badges = ["Event Attendee", "Workshop Contributor", "Feedback Champion"];

const upcomingDeadlines = [
  { task: "Feedback Submission", date: "2024-10-30" },
  { task: "Event Registration", date: "2024-11-01" },
];

const peerComparison = {
  yourParticipation: 6,
  peerAverage: 4,
};

const discussionTopics = [
  "What did you think about the last workshop?",
  "Anyone attending the cultural fest?",
];

// Modal Component for Event Details
const Modal = ({ isOpen, close, event }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">{event.name}</h2>
          <p>Date: {event.date}</p>
          <p>Time: {event.time}</p>
          <p>Status: <span className={`font-bold ${event.status === "upcoming" ? 'text-green-500' : 'text-red-500'}`}>{event.status}</span></p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition" onClick={close}>Close</button>
        </div>
      </div>
    )
  );
};

const StudentDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  return (
    <div className={`container mx-auto p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} transition-all`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Student Dashboard</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition"
        />
        <button className="ml-2 bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition">
          <FaSearch />
        </button>
      </div>

      {/* User Profile Section */}
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg mb-8 transition-all">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <div className="flex items-center space-x-4">
          <img
            className="h-20 w-20 rounded-full border-2 border-gray-300 shadow-md"
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            alt="Profile"
          />
          <div>
            <p className="text-lg font-bold">John Doe</p>
            <p className="text-gray-600 dark:text-gray-300">Major: Computer Science</p>
            <p className="text-gray-600 dark:text-gray-300">Interests: AI, Web Development</p>
            <p className="text-gray-600 dark:text-gray-300">Year: 3rd Year</p>
            <p className="text-gray-600 dark:text-gray-300">Student ID: 123456</p>
            <p className="text-gray-600 dark:text-gray-300">Email: johndoe@pccoepune.org</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Achievements:</h3>
          <div className="flex flex-wrap">
            {badges.map((badge, index) => (
              <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-md">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Upcoming Events */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4">
            Upcoming Events <FaInfoCircle className="inline text-gray-400" title="Events you have registered for." />
          </h2>
          <div className="accordion">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="border-b py-4 last:border-b-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition" onClick={() => handleEventClick(event)}>
                <p className="text-lg font-medium">{event.name}</p>
                <p>{event.date} at {event.time}</p>
                <p>Countdown: {Math.floor((new Date(event.date) - new Date()) / (1000 * 60 * 60 * 24))} days left</p>
              </div>
            ))}
          </div>
        </div>

        {/* Participation Metrics */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4">Participation Metrics</h2>
          <Line data={participationData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
        </div>

        {/* Notifications */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
          <ul className="space-y-2">
            {notifications.map((note, index) => (
              <li key={index} className={`flex items-center p-2 rounded-md ${note.isNew ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-200 dark:bg-gray-600'} hover:bg-gray-300 dark:hover:bg-gray-500 transition`}>
                <FaBell className="text-blue-500 mr-3" />
                <span>{note.message}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Deadlines</h2>
        <ul className="space-y-2">
          {upcomingDeadlines.map((deadline, index) => (
            <li key={index} className="flex justify-between p-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition">
              <span>{deadline.task}</span>
              <span>{deadline.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Peer Comparison */}
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Peer Comparison</h2>
        <p>Your Events Participated: <span className="font-bold text-blue-500">{peerComparison.yourParticipation}</span></p>
        <p>Peer Average: <span className="font-bold text-blue-500">{peerComparison.peerAverage}</span></p>
      </div>

      {/* Calendar */}
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Calendar</h2>
        <Calendar />
      </div>

      {/* Discussion Forum */}
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Discussion Topics</h2>
        <ul className="space-y-2">
          {discussionTopics.map((topic, index) => (
            <li key={index} className="flex justify-between items-center p-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition">
              <span className="text-gray-700 dark:text-gray-300">{topic}</span>
            </li>
          ))}
        </ul>
        {/* Start Discussion Button */}
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition flex items-center">
          <FaPlusCircle className="mr-2" />
          Start Discussion
        </button>
      </div>

      {/* Modal for Event Details */}
      <Modal isOpen={modalOpen} close={() => setModalOpen(false)} event={selectedEvent} />
    </div>
  );
};

export default StudentDashboard;
