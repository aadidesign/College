"use client"

// components/DocumentFormat.js
import React, { useState } from 'react';

const DocumentFormat = () => {
  const [rejected, setRejected] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = () => {
    alert('The letter has been approved!');
    // Handle approval logic here
  };

  const handleReject = () => {
    setRejected(true);
  };

  const handleRejectionSubmit = () => {
    if (rejectionReason.trim()) {
      alert(`The letter has been rejected. Reason: ${rejectionReason}`);
      // Handle rejection logic here
    } else {
      alert('Please provide a reason for rejection.');
    }
  };

  return (
    <div className="absolute right-[600px] bg-white top-[150px] w-[87vw] h-[90vh] max-w-4xl mx-auto p-10 bg-white border border-gray-300 rounded-lg shadow-md">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Letter to the Head of Department</h1>
        <p className="text-gray-500">October 20, 2024</p>
      </header>

      <section className="mb-10 text-lg leading-relaxed text-gray-800">
        <p className="mb-6">Dear Dr. S. S. Sane,</p>

        <p className="mb-6">
          I am writing to formally forward the details of the upcoming event, <strong>Anantya 2024</strong>, that is scheduled for <strong>December 12, 2024</strong>. The purpose of this event is to bring together students from various technical domains and provide a platform for innovation, collaboration, and learning.
        </p>

        <p className="mb-6">
          Please find attached the schedule and a list of speakers for your reference. We kindly request your department’s assistance in coordinating the technical sessions and overseeing the participation of your faculty and students.
        </p>
      </section>

      <section className="text-lg leading-relaxed text-gray-800 mb-8">
        <p className="mb-6">Sincerely,</p>
        <p className="font-bold">Prof. John Doe</p>
        <p className="text-gray-600">College Head</p>
      </section>

      {/* Approve and Reject buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleApprove}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Approve
        </button>
        <button
          onClick={handleReject}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reject
        </button>
      </div>

      {/* If rejected, prompt for rejection reason */}
      {rejected && (
        <div className="mt-6">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="rejectionReason">
            Please provide a reason for rejection:
          </label>
          <input
            type="text"
            id="rejectionReason"
            className="w-full p-2 border border-gray-300 text-black rounded focus:outline-none focus:border-blue-500"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter rejection reason..."
          />
          <button
            onClick={handleRejectionSubmit}
            className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600"
          >
            Submit Rejection
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentFormat;
