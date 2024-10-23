// src/pages/analyticsdashboard.js

import { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, BarElement, Tooltip, Legend } from 'chart.js';
// import 'react-datepicker/dist/react-datepicker.css'; // Include DatePicker CSS
import DatePicker from 'react-datepicker';

// Registering necessary Chart.js components
ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, BarElement, Tooltip, Legend);

// Sample data for demonstration
const eventData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Participation Rate',
      data: [20, 30, 50, 40, 60, 70],
      fill: false,
      borderColor: '#3b82f6',
      tension: 0.1,
    },
  ],
};

const inventoryData = {
  labels: ['Stationery', 'Equipment', 'Miscellaneous'],
  datasets: [
    {
      label: 'Inventory Usage',
      data: [300, 150, 200],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: '#3b82f6',
      borderWidth: 1,
    },
  ],
};

const feedbackData = {
  labels: ['Excellent', 'Good', 'Average', 'Poor'],
  datasets: [
    {
      label: 'Feedback Ratings',
      data: [40, 35, 20, 5],
      backgroundColor: 'rgba(34, 197, 94, 0.5)',
      borderColor: '#22c55e',
      borderWidth: 1,
    },
  ],
};

export default function AnalyticsDashboard() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedEvent, setSelectedEvent] = useState('All Events');

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-10">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center text-blue-700 mb-8"
      >
        Analytics Dashboard
      </motion.h1>

      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Participation Insights</h2>
        <select
          className="border border-blue-400 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          <option value="All Branches">All Branches</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
        </select>

        <select
          className="border border-blue-400 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
        >
          <option value="All Events">All Events</option>
          <option value="Workshops">Workshops</option>
          <option value="Seminars">Seminars</option>
          <option value="Competitions">Competitions</option>
        </select>

        <div className="flex justify-between mb-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="border border-blue-400 rounded-lg p-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholderText="Start Date"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="border border-blue-400 rounded-lg p-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholderText="End Date"
          />
        </div>

        <Line data={eventData} options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Participation Rate (%)',
                color: '#333',
              },
            },
          },
        }} />
      </div>

      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Branch-wise Inventory Usage</h2>
        <Bar
          data={inventoryData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                title: {
                  display: true,
                  text: 'Inventory Type',
                  color: '#333',
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Usage Count',
                  color: '#333',
                },
              },
            },
          }}
        />
      </div>

      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Event Feedback Ratings</h2>
        <Bar
          data={feedbackData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                title: {
                  display: true,
                  text: 'Feedback Rating',
                  color: '#333',
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Responses',
                  color: '#333',
                },
              },
            },
          }}
        />
      </div>

      <footer className="text-center mt-10">
        <p className="text-gray-600">Data-Driven Decision Making for Effective Planning!</p>
      </footer>
    </div>
  );
}
