import { useState } from 'react';
import { motion } from 'framer-motion'; // For animations

const AttendanceProofUpload = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [department, setDepartment] = useState('');
  const [organizingClub, setOrganizingClub] = useState('');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the uploaded data here
    setUploadSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-400 py-10 px-5">
      <motion.div 
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Attendance Proof Upload</h1>
        
        {/* Descriptive Section */}
        <div className="mb-10 text-gray-700 text-lg leading-relaxed">
          <p className="font-semibold text-xl text-blue-700">
            This form is exclusively for event organizers and club coordinators to submit attendance proof of their events.
          </p>
          <p className="mt-4">
            Please upload relevant attendance documentation, such as participant sheets or photos, that will be reviewed by the faculty and administrators.
            Ensure the files are clear and represent accurate details for timely verification. 
          </p>
          <p className="mt-6 text-blue-600 font-medium">
            <strong>Note:</strong> The attendance proof should be submitted within 48 hours of the event’s completion to avoid issues with future event approvals.
          </p>
        </div>

        {/* Upload Form */}
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Event Name */}
          <div className="space-y-2">
            <label htmlFor="eventName" className="block text-sm font-semibold text-gray-700">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="eventName" 
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter the event name"
              required 
              className="mt-1 p-4 w-full bg-blue-50 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-lg"
            />
          </div>

          {/* Event Date */}
          <div className="space-y-2">
            <label htmlFor="eventDate" className="block text-sm font-semibold text-gray-700">
              Event Date <span className="text-red-500">*</span>
            </label>
            <input 
              type="date" 
              id="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required 
              className="mt-1 p-4 w-full bg-blue-50 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-lg"
            />
          </div>

          {/* Event Time */}
          <div className="space-y-2">
            <label htmlFor="eventTime" className="block text-sm font-semibold text-gray-700">
              Event Time <span className="text-red-500">*</span>
            </label>
            <input 
              type="time" 
              id="eventTime"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              required 
              className="mt-1 p-4 w-full bg-blue-50 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-lg"
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <label htmlFor="department" className="block text-sm font-semibold text-gray-700">
              Department <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="department" 
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter the department organizing the event"
              required 
              className="mt-1 p-4 w-full bg-blue-50 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-lg"
            />
          </div>

          {/* Organizing Club */}
          <div className="space-y-2">
            <label htmlFor="organizingClub" className="block text-sm font-semibold text-gray-700">
              Organizing Club <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="organizingClub" 
              value={organizingClub}
              onChange={(e) => setOrganizingClub(e.target.value)}
              placeholder="Enter the name of the organizing club"
              required 
              className="mt-1 p-4 w-full bg-blue-50 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-lg"
            />
          </div>

          {/* Upload File */}
          <div className="space-y-2">
            <label htmlFor="fileUpload" className="block text-sm font-semibold text-gray-700">
              Upload Attendance Proof <span className="text-red-500">*</span>
            </label>
            <input 
              type="file" 
              id="fileUpload" 
              onChange={handleFileUpload}
              accept=".jpg,.jpeg,.png,.pdf"
              required 
              className="mt-1 p-2 w-full bg-blue-50 border border-blue-300 rounded-md text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-sm text-gray-500 mt-2">
              Accepted formats: JPEG, PNG, PDF. Maximum file size: 5MB.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
              Additional Comments
            </label>
            <textarea 
              id="description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide any extra details about the attendance"
              rows={5}
              className="mt-1 p-4 w-full bg-blue-50 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-lg"
            />
          </div>

          {/* Submit Button */}
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md shadow-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg"
            >
              Upload Attendance Proof
            </button>
          </motion.div>
        </motion.form>

        {/* Success Message */}
        {uploadSuccess && (
          <motion.div 
            className="mt-10 text-center bg-green-100 text-green-700 p-4 rounded-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Attendance proof uploaded successfully!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AttendanceProofUpload;
