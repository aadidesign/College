import React, { useState } from 'react';
import { FaPlus, FaUserPlus, FaCalendarAlt, FaClipboardList, FaSun, FaMoon } from 'react-icons/fa';
import Modal from 'react-modal';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Modal.setAppElement('#__next');

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ClubDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', description: '', type: '' });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [clubMembers, setClubMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', email: '' });
  const [feedback, setFeedback] = useState([]);
  const [newFeedback, setNewFeedback] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [showAttendanceChart, setShowAttendanceChart] = useState(false);

  const openModal = (event) => {
    setEventDetails(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEventDetails(null);
  };

  const handleCreateEvent = () => {
    if (newEvent.name && newEvent.date) {
      setEvents([...events, { ...newEvent, id: events.length + 1 }]);
      setNewEvent({ name: '', date: '', description: '', type: '' });
    }
  };

  const handlePostAnnouncement = () => {
    if (newAnnouncement) {
      setAnnouncements([...announcements, newAnnouncement]);
      setNewAnnouncement('');
    }
  };

  const handleFeedbackSubmit = () => {
    if (newFeedback) {
      setFeedback([...feedback, newFeedback]);
      setNewFeedback('');
    }
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      setClubMembers([...clubMembers, { ...newMember, id: clubMembers.length + 1 }]);
      setNewMember({ name: '', email: '' });
    }
  };

  const handleAttendanceSubmit = (eventId) => {
    const event = events.find(e => e.id === eventId);
    const attendanceEntry = { eventId, date: new Date().toLocaleDateString(), attendees: Math.floor(Math.random() * 50) + 1 };
    setAttendanceData([...attendanceData, attendanceEntry]);
    setShowAttendanceChart(true);
  };

  const attendanceChartData = {
    labels: attendanceData.map(data => data.date),
    datasets: [
      {
        label: 'Number of Attendees',
        data: attendanceData.map(data => data.attendees),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`container mx-auto p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Club Dashboard</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
        </button>
      </div>

      {/* Event Management Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Events</h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Event Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            className="flex-grow p-2 border rounded-md mr-2"
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="p-2 border rounded-md mr-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            className="flex-grow p-2 border rounded-md mr-2"
          />
          <input
            type="text"
            placeholder="Type"
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
            className="flex-grow p-2 border rounded-md mr-2"
          />
          <button onClick={handleCreateEvent} className="bg-blue-500 text-white py-2 px-4 rounded-md"><FaPlus /></button>
        </div>
        <h3 className="mt-4 text-lg">Upcoming Events:</h3>
        <ul className="space-y-2">
          {events.map(event => (
            <li key={event.id} className="p-2 bg-gray-200 rounded-md flex justify-between items-center">
              <span>{event.name} - {event.date}</span>
              <div className="flex">
                <button onClick={() => handleAttendanceSubmit(event.id)} className="bg-green-500 text-white py-1 px-3 rounded-md mr-2">Submit Attendance</button>
                <button onClick={() => openModal(event)} className="bg-blue-500 text-white py-1 px-3 rounded-md">Details</button>
              </div>
            </li>
          ))}
        </ul>
        {showAttendanceChart && (
          <div className="mt-4">
            <h3 className="text-lg">Attendance Chart:</h3>
            <Bar data={attendanceChartData} />
          </div>
        )}
      </div>

      {/* Announcements Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Announcements</h2>
        <ul className="space-y-2 mb-4">
          {announcements.map((announcement, index) => (
            <li key={index} className="p-2 bg-gray-200 rounded-md">{announcement}</li>
          ))}
        </ul>
        <div className="flex mb-4">
          <input
            type="text"
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
            placeholder="Post a new announcement"
            className="flex-grow p-2 border rounded-md"
          />
          <button onClick={handlePostAnnouncement} className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2">Post</button>
        </div>
      </div>

      {/* Club Members Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Club Members</h2>
        <ul className="space-y-2 mb-4">
          {clubMembers.map(member => (
            <li key={member.id} className="flex justify-between items-center p-2 bg-gray-200 rounded-md">
              <span>{member.name} ({member.email})</span>
              <button className="bg-red-500 text-white py-1 px-3 rounded-md">Remove</button>
            </li>
          ))}
        </ul>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Member Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            className="flex-grow p-2 border rounded-md mr-2"
          />
          <input
            type="email"
            placeholder="Member Email"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
            className="flex-grow p-2 border rounded-md mr-2"
          />
          <button onClick={handleAddMember} className="bg-green-500 text-white py-2 px-4 rounded-md"><FaUserPlus /></button>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
        <ul className="space-y-2 mb-4">
          {feedback.map((feedbackEntry, index) => (
            <li key={index} className="p-2 bg-gray-200 rounded-md">{feedbackEntry}</li>
          ))}
        </ul>
        <div className="flex mb-4">
          <input
            type="text"
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
            placeholder="Leave your feedback"
            className="flex-grow p-2 border rounded-md"
          />
          <button onClick={handleFeedbackSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2">Submit</button>
        </div>
      </div>

      {/* Event Details Modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="Modal" overlayClassName="Overlay">
        {eventDetails && (
          <div>
            <h2 className="text-2xl font-semibold">{eventDetails.name}</h2>
            <p className="mt-2">{eventDetails.description}</p>
            <p className="mt-2"><strong>Date:</strong> {eventDetails.date}</p>
            <p className="mt-2"><strong>Type:</strong> {eventDetails.type}</p>
            <button onClick={closeModal} className="bg-red-500 text-white py-2 px-4 rounded-md mt-4">Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ClubDashboard;
