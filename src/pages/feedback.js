import { useState } from 'react';
import { HiOutlineUser, HiOutlineMail, HiOutlineBookOpen, HiOutlineClipboardList } from 'react-icons/hi';

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    branch: '',
    yearOfStudy: '',
    feedback: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [notification, setNotification] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setNotification(true);

    // Reset form data after submission (optional)
    setFormData({
      name: '',
      studentId: '',
      email: '',
      branch: '',
      yearOfStudy: '',
      feedback: '',
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-blue-700 p-6 text-white text-center shadow-lg">
        <h1 className="text-3xl font-bold">PCCOE Student Feedback</h1>
        <p className="mt-2 text-sm">Your feedback helps us improve!</p>
      </header>

      <section className="flex-grow p-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Feedback Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="flex items-center border-b-2 border-gray-300 focus-within:border-blue-500">
              <HiOutlineUser className="w-6 h-6 text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="flex-grow py-2 outline-none"
                required
              />
            </div>

            {/* Student ID */}
            <div className="flex items-center border-b-2 border-gray-300 focus-within:border-blue-500">
              <HiOutlineClipboardList className="w-6 h-6 text-gray-400 mr-2" />
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Student ID"
                className="flex-grow py-2 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div className="flex items-center border-b-2 border-gray-300 focus-within:border-blue-500">
              <HiOutlineMail className="w-6 h-6 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="flex-grow py-2 outline-none"
                required
              />
            </div>

            {/* Branch */}
            <div className="flex items-center border-b-2 border-gray-300 focus-within:border-blue-500">
              <HiOutlineBookOpen className="w-6 h-6 text-gray-400 mr-2" />
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="Branch"
                className="flex-grow py-2 outline-none"
                required
              />
            </div>

            {/* Year of Study */}
            <div className="flex items-center border-b-2 border-gray-300 focus-within:border-blue-500">
              <HiOutlineClipboardList className="w-6 h-6 text-gray-400 mr-2" />
              <input
                type="text"
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                placeholder="Year of Study"
                className="flex-grow py-2 outline-none"
                required
              />
            </div>

            {/* Feedback */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Feedback</label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 resize-none"
                rows="4"
                placeholder="Your feedback here..."
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Submit Feedback
            </button>
          </form>

          {/* Notification */}
          {notification && (
            <div className="mt-4 p-4 text-white bg-green-600 rounded-md shadow-md">
              Your feedback has been submitted successfully!
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 p-6 text-white text-center">
        © 2024 PCCOE Event & Inventory Management. All rights reserved.
      </footer>
    </div>
  );
}
