"use client";  // This is crucial to mark this as a Client Component

import { useState } from 'react';

const EventsSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilters, setCategoryFilters] = useState({
    commercial: false,
    office: false,
    shop: false,
    education: false,
  });
  
  const [visibleEvents, setVisibleEvents] = useState(6); // State to manage visible events

  // Example events data with more events added for testing "Load More"
  const events = [
    { id: 1, title: 'Tech Expo 2024', location: 'Main Hall', date: 'June 12, 2024', image: '/images/event1.jpg' },
    { id: 2, title: 'Cultural Fest', location: 'Auditorium', date: 'April 20, 2024', image: '/images/event2.jpg' },
    { id: 3, title: 'Startup Pitch', location: 'Innovation Lab', date: 'March 5, 2024', image: '/images/event3.jpg' },
    { id: 4, title: 'Coding Marathon', location: 'Computer Lab', date: 'Feb 15, 2024', image: '/images/event4.jpg' },
    { id: 5, title: 'Music Concert', location: 'Open Ground', date: 'July 30, 2024', image: '/images/event5.jpg' },
    { id: 6, title: 'Annual Sports Day', location: 'Sports Complex', date: 'August 10, 2024', image: '/images/event6.jpg' },
    { id: 7, title: 'Photography Contest', location: 'Art Room', date: 'May 15, 2024', image: '/images/event7.jpg' },
    { id: 8, title: 'Hackathon', location: 'Innovation Lab', date: 'Nov 8, 2024', image: '/images/event8.jpg' },
    { id: 9, title: 'Debate Competition', location: 'Seminar Hall', date: 'Jan 21, 2024', image: '/images/event9.jpg' },
    { id: 10, title: 'Alumni Meetup', location: 'Cafeteria', date: 'Sept 18, 2024', image: '/images/event10.jpg' },
    // Add more events as needed
  ];

  // Handle search query
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

  // Load more events function
  const loadMoreEvents = () => {
    setVisibleEvents((prevVisibleEvents) => prevVisibleEvents + 6); // Load 6 more events
  };

  return (
    <div className="container mx-auto py-10">
      {/* Page Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Explore College Events</h1>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search events..."
          className="border border-gray-300 p-3 rounded-lg w-1/3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex">
        {/* Sidebar Filters */}
        <aside className="w-1/4 bg-blue-100 p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl text-blue-600 mb-4">Filter by Category</h3>
          <ul className="space-y-4">
            {['commercial', 'office', 'shop', 'education'].map((category) => (
              <li key={category}>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={categoryFilters[category]}
                    onChange={() => toggleCategory(category)}
                    className="text-blue-600 form-checkbox"
                  />
                  <span className="ml-2 text-blue-600 capitalize">{category}</span>
                </label>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content - Event Cards */}
        <div className="w-3/4 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events
            .filter((event) =>
              event.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, visibleEvents) // Show only visible events
            .map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-blue-700">{event.title}</h2>
                  <p className="text-blue-600">Location: {event.location}</p>
                  <p className="text-gray-600">Date: {event.date}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Pagination - Load More Button */}
      {visibleEvents < events.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMoreEvents}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200"
          >
            Load More Events
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsSearchBar;
