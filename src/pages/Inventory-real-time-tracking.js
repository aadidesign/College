import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Real-Time Tracking Page
export default function RealTimeTracking({ materials }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMaterials, setFilteredMaterials] = useState(materials);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState({ id: null, rating: 0, comment: '' });
  const [requests, setRequests] = useState([]);
  const [showRequestPopup, setShowRequestPopup] = useState(false);
  const [newRequest, setNewRequest] = useState({ name: '', dateTime: '', returnTime: '', club: '', department: '', details: '' });

  useEffect(() => {
    setFilteredMaterials(
      materials.filter(material =>
        material.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, materials]);

  const confirmDelivery = async (id) => {
    alert(`Delivery confirmed for item ID: ${id}`);
  };

  const submitFeedback = async () => {
    alert(`Feedback submitted for item ID: ${feedback.id}`);
  };

  const requestMaterial = async () => {
    setRequests([...requests, newRequest]);
    alert(`Request submitted for: ${newRequest.name}`);
    setShowRequestPopup(false);
    setNewRequest({ name: '', dateTime: '', returnTime: '', club: '', department: '', details: '' });
  };

  if (!filteredMaterials) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading materials: {error.message}</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center text-blue-700 mb-8"
      >
        Real-Time Event Material Tracking
      </motion.h1>

      <div className="container mx-auto mb-4">
        <input
          type="text"
          placeholder="Search materials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((material) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">{material.name}</h2>
              <p className="text-sm text-gray-500">Status: 
                <span className={material.available ? 'text-green-500 ml-2' : 'text-red-500 ml-2'}>
                  {material.available ? 'Available' : 'In Use'}
                </span>
              </p>
              <p className="text-sm text-gray-500">Location: {material.location}</p>
              <p className="text-sm text-gray-500">Event: {material.event}</p>
              <p className="text-sm text-gray-500">Date: {material.date}</p>
              <p className="text-sm text-gray-500">Timing: {material.time}</p>
              <p className="text-sm text-gray-500">Department: {material.department}</p>
              <p className="text-sm text-gray-500">Organizing Club: {material.club}</p>
              <p className="text-sm text-gray-400">Last Updated: {new Date(material.lastUpdated).toLocaleString()}</p>
              
              <div className="mt-4 flex space-x-2">
                {material.available && (
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={() => confirmDelivery(material.id)}
                  >
                    Confirm Delivery
                  </button>
                )}
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                  onClick={() => setShowRequestPopup(true)}
                >
                  Request Material
                </button>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold">Feedback:</h3>
                <input
                  type="number"
                  min="1"
                  max="5"
                  placeholder="Rate (1-5)"
                  className="border rounded p-1 w-20"
                  onChange={(e) => setFeedback({ ...feedback, id: material.id, rating: e.target.value })}
                />
                <textarea
                  placeholder="Comments"
                  className="border rounded p-1 w-full mt-2"
                  onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                />
                <button
                  onClick={submitFeedback}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Submit Feedback
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No materials available.</p>
        )}
      </div>

      {showRequestPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Request Material</h2>
            <label className="block mb-1">Your Name</label>
            <input
              type="text"
              value={newRequest.name}
              onChange={(e) => setNewRequest({ ...newRequest, name: e.target.value })}
              className="border rounded p-2 w-full mb-3"
              placeholder="Enter your name"
            />
            <label className="block mb-1">Date & Time Needed</label>
            <input
              type="datetime-local"
              value={newRequest.dateTime}
              onChange={(e) => setNewRequest({ ...newRequest, dateTime: e.target.value })}
              className="border rounded p-2 w-full mb-3"
            />
            <label className="block mb-1">Return Time</label>
            <input
              type="datetime-local"
              value={newRequest.returnTime}
              onChange={(e) => setNewRequest({ ...newRequest, returnTime: e.target.value })}
              className="border rounded p-2 w-full mb-3"
            />
            <label className="block mb-1">Club Name</label>
            <input
              type="text"
              value={newRequest.club}
              onChange={(e) => setNewRequest({ ...newRequest, club: e.target.value })}
              className="border rounded p-2 w-full mb-3"
              placeholder="Enter your club name"
            />
            <label className="block mb-1">Department</label>
            <input
              type="text"
              value={newRequest.department}
              onChange={(e) => setNewRequest({ ...newRequest, department: e.target.value })}
              className="border rounded p-2 w-full mb-3"
              placeholder="Enter your department"
            />
            <label className="block mb-1">Additional Details</label>
            <textarea
              value={newRequest.details}
              onChange={(e) => setNewRequest({ ...newRequest, details: e.target.value })}
              className="border rounded p-2 w-full mb-4"
              placeholder="Enter any additional details"
            />
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded mr-2" onClick={requestMaterial}>
                Submit Request
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => setShowRequestPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center mt-8">
        <p className="text-gray-600">Last date for submissions: <strong>{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</strong></p>
      </footer>
    </div>
  );
}

