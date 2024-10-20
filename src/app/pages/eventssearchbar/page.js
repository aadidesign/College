// src/app/pages/eventssearchbar/page.js
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

  const courses = [
    {
      id: 1,
      title: 'Create an LMS Website with LearnPress',
      instructor: 'Jenny Wilson',
      price: 'Free',
      students: 15,
      image: '/images/course1.jpg',
    },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleCategory = (category) => {
    setCategoryFilters({
      ...categoryFilters,
      [category]: !categoryFilters[category],
    });
  };

  return (
    <div className="container mx-auto py-10">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Events</h1>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search events..."
          className="border border-gray-300 p-2 rounded-md w-1/3"
        />
      </div>

      <div className="flex">
        {/* Sidebar Filters */}
        <aside className="w-1/4 bg-gray-100 p-4">
          <h3 className="font-bold text-lg mb-4">Events Category</h3>
          <ul>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={categoryFilters.commercial}
                  onChange={() => toggleCategory('commercial')}
                />
                Commercial
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={categoryFilters.office}
                  onChange={() => toggleCategory('office')}
                />
                Office
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={categoryFilters.shop}
                  onChange={() => toggleCategory('shop')}
                />
                Shop
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={categoryFilters.education}
                  onChange={() => toggleCategory('education')}
                />
                Education
              </label>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className="w-3/4 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses
            .filter((course) =>
              course.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((course) => (
              <div
                key={course.id}
                className="bg-white shadow-lg rounded-lg p-4 mb-6"
              >
                <div className="image">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="rounded"
                  />
                </div>
                <div className="content mt-4">
                  <h2 className="text-xl font-bold">{course.title}</h2>
                  <p>{course.instructor}</p>
                  <p>{course.price}</p>
                  <p>{course.students} Students</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EventsSearchBar;
