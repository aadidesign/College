import React, { useState } from 'react';
import { FaRegBell, FaCalendarAlt, FaUserPlus, FaUsers, FaClipboardList, FaSun, FaMoon } from 'react-icons/fa';
import Modal from 'react-modal';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2'; // Using Bar for specific chart type

Modal.setAppElement('#__next');

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FacultyDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [pendingEvents, setPendingEvents] = useState([
    { id: 1, name: 'Tech Fest 2024', date: '2024-11-01', description: 'Annual technology festival.', type: 'Technical' },
    { id: 2, name: 'Cultural Night', date: '2024-12-15', description: 'Celebration of culture and diversity.', type: 'Cultural' },
  ]);
  const [announcements, setAnnouncements] = useState([
    'Welcome to the Faculty Dashboard!',
    'Upcoming deadlines for event proposals: October 30, 2024.',
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [resources, setResources] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [eventHistory, setEventHistory] = useState([
    { id: 1, name: 'AI Workshop', date: '2024-09-15', attendance: 80 },
    { id: 2, name: 'Coding Hackathon', date: '2024-10-05', attendance: 120 },
  ]);
  const [newFeedback, setNewFeedback] = useState('');
  const [upcomingMeetings, setUpcomingMeetings] = useState([
    { id: 1, title: 'Monthly Club Meeting', date: '2024-10-30', time: '10:00 AM' },
    { id: 2, title: 'Event Planning Session', date: '2024-11-05', time: '2:00 PM' },
  ]);
  const [document, setDocument] = useState(null);

  // Sample data for user management
  const clubMembers = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];

  // Sample data for analytics
  const analyticsData = {
    labels: ['Tech Fest', 'Cultural Night'],
    datasets: [
      {
        label: 'Registrations',
        data: [120, 75],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 2,
      },
    ],
  };

  const handleApproveEvent = (eventId) => {
    setPendingEvents(pendingEvents.filter(event => event.id !== eventId));
    alert(`Event ${eventId} approved!`);
  };

  const handleRejectEvent = (eventId) => {
    setPendingEvents(pendingEvents.filter(event => event.id !== eventId));
    alert(`Event ${eventId} rejected!`);
  };

  const handlePostAnnouncement = () => {
    if (newAnnouncement) {
      setAnnouncements([...announcements, newAnnouncement]);
      setNewAnnouncement('');
      alert('Announcement posted!');
    }
  };

  const handleResourceRequest = (resource) => {
    setResources([...resources, resource]);
    alert(`Resource "${resource}" requested!`);
  };

  const handleFeedbackSubmit = () => {
    if (newFeedback) {
      setFeedback([...feedback, newFeedback]);
      setNewFeedback('');
      alert('Feedback submitted!');
    }
  };

  const handleDocumentUpload = (e) => {
    setDocument(e.target.files[0]);
    alert('Document uploaded!');
  };

  const openModal = (event) => {
    setEventDetails(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEventDetails(null);
  };

  return (
    <div className={`container mx-auto p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Faculty Dashboard</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
        </button>
      </div>

      {/* Event Proposals Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Pending Event Proposals</h2>
        <ul className="space-y-2">
          {pendingEvents.map(event => (
            <li key={event.id} className="flex justify-between items-center p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition">
              <span>{event.name} - {event.date}</span>
              <div>
                <button onClick={() => handleApproveEvent(event.id)} className="bg-green-500 text-white py-1 px-3 rounded-md mr-2">Approve</button>
                <button onClick={() => handleRejectEvent(event.id)} className="bg-red-500 text-white py-1 px-3 rounded-md mr-2">Reject</button>
                <button onClick={() => openModal(event)} className="bg-blue-500 text-white py-1 px-3 rounded-md">Details</button>
              </div>
            </li>
          ))}
        </ul>
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

      {/* Resource Management Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Resource Booking</h2>
        <button onClick={() => handleResourceRequest('Projector')} className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">Request Projector</button>
        <button onClick={() => handleResourceRequest('Sound System')} className="bg-blue-500 text-white py-2 px-4 rounded-md">Request Sound System</button>
        <h3 className="mt-4">Requested Resources:</h3>
        <ul className="space-y-2">
          {resources.map((resource, index) => (
            <li key={index} className="p-2 bg-gray-200 rounded-md">{resource}</li>
          ))}
        </ul>
      </div>

      {/* User Management Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Club Members</h2>
        <ul className="space-y-2">
          {clubMembers.map(member => (
            <li key={member.id} className="flex justify-between items-center p-2 bg-gray-200 rounded-md">
              <span>{member.name} ({member.email})</span>
              <button className="bg-red-500 text-white py-1 px-3 rounded-md">Remove</button>
            </li>
          ))}
        </ul>
        <button className="bg-green-500 text-white py-2 px-4 rounded-md mt-4">Add Member <FaUserPlus className="inline" /></button>
      </div>

      {/* Feedback Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Event Feedback</h2>
        <ul className="space-y-2 mb-4">
          {feedback.map((fb, index) => (
            <li key={index} className="p-2 bg-gray-200 rounded-md">{fb}</li>
          ))}
        </ul>
        <div className="flex mb-4">
          <input
            type="text"
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
            placeholder="Provide feedback on events"
            className="flex-grow p-2 border rounded-md"
          />
          <button onClick={handleFeedbackSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2">Submit</button>
        </div>
      </div>

      {/* Event History Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Event History</h2>
        <ul className="space-y-2">
          {eventHistory.map(event => (
            <li key={event.id} className="p-2 bg-gray-200 rounded-md">
              {event.name} - {event.date} (Attendance: {event.attendance})
            </li>
          ))}
        </ul>
      </div>

      {/* Upcoming Meetings Calendar Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Meetings</h2>
        <ul className="space-y-2">
          {upcomingMeetings.map(meeting => (
            <li key={meeting.id} className="p-2 bg-gray-200 rounded-md">
              {meeting.title} - {meeting.date} at {meeting.time}
            </li>
          ))}
        </ul>
      </div>

      {/* Document Upload Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upload Event Documents</h2>
        <input type="file" onChange={handleDocumentUpload} className="mb-4" />
      </div>

      {/* Event Registrations Analytics Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Event Registrations Analytics</h2>
        <Bar 
          data={analyticsData} 
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                  },
                },
              },
            },
            animation: {
              duration: 1000, // Duration of animation
              easing: 'easeOutBounce', // Animation easing
            },
          }}
        />
      </div>

      <div>
        <button className='m-2 p-2 bg-blue-500'>Attendance Take</button>
      </div>

      {/* Event Details Modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal" overlayClassName="overlay">
        <h2 className="text-2xl font-semibold">{eventDetails?.name}</h2>
        <p><strong>Date:</strong> {eventDetails?.date}</p>
        <p><strong>Description:</strong> {eventDetails?.description}</p>
        <p><strong>Type:</strong> {eventDetails?.type}</p>
        <button onClick={closeModal} className="bg-red-500 text-white py-2 px-4 rounded-md mt-4">Close</button>
      </Modal>
    </div>
  );
};

export default FacultyDashboard;
