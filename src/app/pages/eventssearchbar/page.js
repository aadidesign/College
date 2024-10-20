"use client";  // Mark as Client Component

import { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const EventsSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilters, setCategoryFilters] = useState({
    commercial: false,
    office: false,
    shop: false,
    education: false,
  });

  // Example large set of events data
  const events = [
    {
      id: 1,
      title: 'Tech Expo 2024',
      instructor: 'Jenny Wilson',
      price: 'Free',
      students: 200,
      image: '/images/event1.jpg',
    },
    {
      id: 2,
      title: 'Marketing Summit',
      instructor: 'John Doe',
      price: '$49',
      students: 320,
      image: '/images/event2.jpg',
    },
    {
      id: 3,
      title: 'Design Thinking Workshop',
      instructor: 'Sara Lee',
      price: 'Free',
      students: 150,
      image: '/images/event3.jpg',
    },
    {
      id: 4,
      title: 'AI and Machine Learning Conference',
      instructor: 'Alex Smith',
      price: '$99',
      students: 500,
      image: '/images/event4.jpg',
    },
    {
      id: 5,
      title: 'Blockchain Expo',
      instructor: 'Emily Zhang',
      price: '$75',
      students: 340,
      image: '/images/event5.jpg',
    },
    {
      id: 6,
      title: 'Leadership Bootcamp',
      instructor: 'Michael Johnson',
      price: '$25',
      students: 120,
      image: '/images/event6.jpg',
    },
    {
      id: 7,
      title: 'FinTech Forum 2024',
      instructor: 'David Miller',
      price: '$150',
      students: 600,
      image: '/images/event7.jpg',
    },
    {
      id: 8,
      title: 'Healthcare Innovations Summit',
      instructor: 'Sophia Brown',
      price: 'Free',
      students: 400,
      image: '/images/event8.jpg',
    },
    {
      id: 9,
      title: 'Cybersecurity Seminar',
      instructor: 'Chris Evans',
      price: '$75',
      students: 220,
      image: '/images/event9.jpg',
    },
    // Add more mock events here for testing large data sets
  ];

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Toggle category filters
  const toggleCategory = (category) => {
    setCategoryFilters({
      ...categoryFilters,
      [category]: !categoryFilters[category],
    });
  };

  // Filtered events based on search query
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-12 px-6">
      {/* Search Bar Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Explore Events</h1>
        
        {/* Search Input */}
        <div className="relative flex items-center w-full sm:w-1/2 md:w-1/3">
          <FaSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search events by name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ease-in-out duration-200"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-1/4 bg-white p-6 shadow-lg rounded-lg">
          <h3 className="font-semibold text-xl text-gray-700 mb-4 flex items-center">
            <FaFilter className="mr-2 text-indigo-500" /> Filters
          </h3>
          <ul className="space-y-4">
            {['commercial', 'office', 'shop', 'education'].map((category) => (
              <li key={category} className="flex justify-between items-center">
                <label className="flex items-center space-x-3 cursor-pointer text-gray-700">
                  <input
                    type="checkbox"
                    checked={categoryFilters[category]}
                    onChange={() => toggleCategory(category)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="capitalize">{category}</span>
                </label>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative pb-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-800">{event.title}</h2>
                  <p className="text-gray-500 mt-2">{event.instructor}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-indigo-600 font-medium">{event.price}</span>
                    <span className="text-gray-500 text-sm">{event.students} Attendees</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 text-center text-gray-500">
              No events found. Try a different search or adjust the filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsSearchBar;
