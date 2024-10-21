import React from 'react';
import { FaUser } from 'react-icons/fa';

const authorities = [
  { name: 'Dr. S. S. Sane', title: 'Principal' },
  { name: 'Dr. A. B. Patil', title: 'HOD' }, // Added another authority as an example
];

const upcomingEvents = [
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlygWcz51gyDexlstejSgZZ2LSxqF4rBz3wQ&s",
    who: "Computer Department",
    title: 'Anantya',
    status: 70, // Example percentage for the status bar
    left: '2 days left',
  },
  {
    image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg",
    who: "IT Department",
    title: 'OWASP',
    status: 40, // Example percentage for the status bar
    left: '5 days left',
  },
  {
    image: "https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg", // Added new event image
    who: "Electronics Department",
    title: 'Tech Fest',
    status: 85, // Example percentage for the status bar
    left: '1 week left',
  },
  {
    image: "https://www.shutterstock.com/shutterstock/photos/1932042689/display_1500/stock-photo-businessman-using-mobile-smart-phone-business-global-internet-connection-application-technology-1932042689.jpg", // Added new event image
    who: "Mechanical Department",
    title: 'Annual Sports Day',
    status: 20, // Example percentage for the status bar
    left: '3 days left',
  },
];

const Hero = () => {
  return (
    <div className='absolute right-0 top-24 w-[87vw] bg-white h-[90vh] overflow-y-auto'>
      <div className="p-5">
        <h1 className='text-black text-[35px] mb-5'>Department Authorities</h1>
        <div className='flex flex-wrap'>
          {authorities.map((authority, index) => (
            <div key={index} className='text-gray-800 flex items-center w-[20rem] shadow-xl rounded-2xl m-3 p-4'>
              <FaUser className='m-5 text-3xl' />
              <div className='m-2'>
                <h1 className='text-[20px] font-semibold'>{authority.name}</h1>
                <p className='text-[15px]'>{authority.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5">
        <h1 className='text-black text-[35px] mb-5'>Upcoming Events</h1>
        <div className="flex flex-wrap">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden m-3">
              <img
                className="w-full h-48 object-cover"
                src={event.image}
                alt={`${event.title} - ${event.who}`}
              />
              <div className="p-4">
                <h2 className="text-lg text-gray-800 font-bold">{event.title}</h2>
                <p className="mt-1 text-sm text-gray-600">{event.who}</p>

                {/* Status Bar */}
                <div className="mt-2">
                  <h3 className="text-md text-gray-800 font-semibold">Status:</h3>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${event.status}%` }} // Set the width based on the event's status
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-sm text-gray-600">
                    <span>0%</span>
                    <span>{event.status}%</span>
                    <span>100%</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">{event.left}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
