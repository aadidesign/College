"use client"

// components/FullCalendar.js
import React, { useState } from 'react';

const FullCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get the month and year for the current date
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // Days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Days in month
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  // Get the first day of the month
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  // Generate the calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    // Create empty slots for the days before the first day
    const calendarDays = Array(firstDay).fill(null).concat(days);
    return calendarDays;
  };

  // Handle month change
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Define meetings and events
  const events = [
    { date: new Date(year, month, 10), title: 'Board Meeting' },
    { date: new Date(year, month, 15), title: 'Project Deadline' },
    { date: new Date(year, month, 20), title: 'Team Outing' },
    { date: new Date(year, month, 25), title: 'Client Presentation' },
    { date: new Date(year, month, 30), title: 'Monthly Review' },
  ];

  const calendarDays = generateCalendarDays();

  return (
    <div className="w-screen h-screen flex flex-col bg-white">
      <header className="bg-blue-600 text-white text-3xl text-center py-4 flex justify-between items-center px-4">
        <button onClick={() => changeMonth(-1)} className="hover:bg-blue-500 rounded px-2 py-1">Prev</button>
        <h1>{currentDate.toLocaleString('default', { month: 'long' })} {year}</h1>
        <button onClick={() => changeMonth(1)} className="hover:bg-blue-500 rounded px-2 py-1">Next</button>
      </header>
      <div className="flex-1 grid grid-cols-7 grid-rows-6 gap-1 p-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-black font-bold">{day}</div>
        ))}
        {calendarDays.map((day, index) => {
          const date = new Date(year, month, day);
          // Check if there are any events for the current day
          const todayEvents = events.filter(event => event.date.toDateString() === date.toDateString());
          return (
            <div key={index} className={`border border-black-500 text-black h-24 flex flex-col items-center justify-center ${day ? '' : 'opacity-50'}`}>
              {day}
              {todayEvents.map((event, idx) => (
                <div key={idx} className="text-sm text-blue-800">{event.title}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FullCalendar;
