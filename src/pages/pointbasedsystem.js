// pages/points-system.js

import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PointsSystem = () => {
  const [progress, setProgress] = useState(60);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleReferralClick = () => {
    alert('Refer a friend feature coming soon!');
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold" data-aos="fade-down">Points-Based System</h1>
        <p className="text-lg mt-2">Earn Rewards for Your Contributions!</p>
      </header>

      {/* Calculate My Points */}
      <section className="mb-8" data-aos="fade-up">
        <h2 className="text-2xl font-semibold">Calculate My Points</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input type="number" className="border p-2 rounded transition-all duration-300 hover:shadow-lg focus:shadow-lg" placeholder="Number of Events Attended" />
          <input type="number" className="border p-2 rounded transition-all duration-300 hover:shadow-lg focus:shadow-lg" placeholder="Number of Feedback Given" />
          <button className="bg-blue-500 text-white p-2 rounded transition-transform duration-300 hover:bg-blue-600 active:scale-95">Calculate My Points</button>
        </div>
      </section>

      {/* Achievements Showcase */}
      <section className="mb-8" data-aos="fade-right">
        <h2 className="text-2xl font-semibold">Your Achievements</h2>
        <div className="grid grid-cols-3 gap-4">
          {['Event Attendee', 'Feedback Contributor', 'Event Organizer'].map((achievement, index) => (
            <div className="border p-4 rounded hover:shadow-xl transition-shadow" key={index}>
              <h3>{achievement}</h3>
              <button className="bg-green-500 text-white p-2 rounded transition-transform duration-300 hover:bg-green-600 active:scale-95">Claim</button>
            </div>
          ))}
        </div>
      </section>

      {/* Referral Program */}
      <section className="mb-8" data-aos="fade-left">
        <h2 className="text-2xl font-semibold">Refer a Friend</h2>
        <button className="bg-yellow-500 text-white p-2 rounded transition-transform duration-300 hover:bg-yellow-600 active:scale-95" onClick={handleReferralClick}>
          Refer Now
        </button>
      </section>

      {/* Upcoming Events */}
      <section className="mb-8" data-aos="fade-up">
        <h2 className="text-2xl font-semibold">Upcoming Events</h2>
        <button className="bg-blue-500 text-white p-2 rounded transition-transform duration-300 hover:bg-blue-600 active:scale-95">Register for Upcoming Events</button>
      </section>

      {/* Social Media Share */}
      <section className="mb-8" data-aos="fade-right">
        <h2 className="text-2xl font-semibold">Share Your Achievement</h2>
        <div className="flex gap-2">
          {['Facebook', 'Twitter'].map((platform, index) => (
            <button key={index} className={`bg-blue-${index === 0 ? '600' : '400'} text-white p-2 rounded transition-transform duration-300 hover:bg-blue-${index === 0 ? '700' : '500'} active:scale-95`}>
              Share on {platform}
            </button>
          ))}
        </div>
      </section>

      {/* Leaderboard Filters */}
      <section className="mb-8" data-aos="fade-left">
        <h2 className="text-2xl font-semibold">Leaderboard</h2>
        <div className="flex gap-2">
          <select className="border p-2 rounded">
            <option value="all">All Students</option>
            <option value="class">By Class</option>
            <option value="department">By Department</option>
          </select>
          <button className="bg-blue-500 text-white p-2 rounded transition-transform duration-300 hover:bg-blue-600 active:scale-95">Filter</button>
        </div>
      </section>

      {/* Notifications */}
      <section className="mb-8" data-aos="fade-up">
        <h2 className="text-2xl font-semibold">Notifications</h2>
        <div className="relative inline-block">
          <button className="flex items-center p-2 border rounded">
            <span className="material-icons">notifications</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 text-xs">{notifications}</span>
          </button>
        </div>
      </section>

      {/* Progress Tracker */}
      <section className="mb-8" data-aos="fade-up">
        <h2 className="text-2xl font-semibold">Progress Tracker</h2>
        <div className="progress-bar bg-gray-200 h-2 rounded">
          <div className="progress-bar-filled bg-blue-500 h-2 rounded" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="mt-1">60% to next reward!</p>
      </section>
    </div>
  );
};

export default PointsSystem;
