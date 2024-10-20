"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import GoogleMapReact from 'google-map-react';

export default function EventPage() {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => setOpenModal(!openModal);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Event Section */}
        <section className="md:flex md:justify-between">
          {/* Left Section */}
          <div className="md:w-2/3">
            {/* Event Image */}
            <div className="relative w-full h-64 sm:h-96">
              <Image
                src="/images/logo.webp"
                alt="Event Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
              />
            </div>
            {/* Event Details */}
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Dream world wide in Jakarta
              </h2>
              <p className="text-gray-500">III Sonepat</p>
              <p className="mt-2 text-gray-600">
                DesignHub organized a 3D Modeling Workshop using Blender on February 16 at 5 PM.
              </p>
              <a href="#" className="text-purple-600 font-semibold mt-4 block">
                View map
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:w-1/3 md:ml-8 mt-8 md:mt-0 bg-white p-6 rounded-lg shadow-lg">
            {/* Date and Time */}
            <h3 className="text-xl font-bold text-gray-800">Date & time</h3>
            <p className="mt-2 text-gray-600">Saturday, March 18 2023, 9:30PM</p>

            {/* Action Buttons */}
            <button 
              className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-purple-700"
              onClick={toggleModal}
            >
              Book now
            </button>

            <Modal open={openModal} onClose={toggleModal}>
              <div className="p-6 bg-white rounded-md shadow-lg max-w-md mx-auto mt-20">
                <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
                <p>Thank you for booking!</p>
                <button 
                  className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-md"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </Modal>

            <button className="mt-2 w-full bg-gray-300 py-2 px-4 rounded-md transition duration-300 hover:bg-gray-400">
              Program promoter
            </button>
            <p className="mt-4 text-gray-500 text-sm">No Refunds</p>
          </div>
        </section>

        {/* Description Section */}
        <section className="mt-8">
          <h3 className="text-xl font-bold text-gray-800">Description</h3>
          <p className="mt-2 text-gray-600">
            DesignHub organized a 3D Modeling Workshop using Blender on February 16 at 5 PM. 
            The workshop taught participants the magic of creating stunning 3D models and animations 
            using Blender. It was suitable for both beginners and experienced users...
          </p>
        </section>

        {/* Event Location Section with Interactive Map */}
        <section className="mt-8">
          <h3 className="text-xl font-bold text-gray-800">Event location</h3>
          <div className="w-full h-64 sm:h-96 mt-4">
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }}
              defaultCenter={{ lat: -6.2088, lng: 106.8456 }}
              defaultZoom={10}
            >
              <div lat={-6.2088} lng={106.8456} className="text-purple-600 font-bold">
                Jakarta
              </div>
            </GoogleMapReact>
          </div>
        </section>

        {/* Tags Section */}
        <section className="mt-8">
          <h3 className="text-xl font-bold text-gray-800">Tags</h3>
          <div className="flex flex-wrap mt-2">
            {['Indonesia event', 'Jaskaran event', 'UI', 'Seminar'].map((tag, i) => (
              <Tooltip title={`More about ${tag}`} key={i}>
                <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm mr-2 hover:bg-gray-300">
                  {tag}
                </span>
              </Tooltip>
            ))}
          </div>
        </section>

        {/* Other Events Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800">Other events you may like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="relative w-full h-48">
                  <Image
                    src="/images/logo.webp"
                    alt="Event Thumbnail"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-black">
                    BestSeller Book Bootcamp - write, Market & Publish Your Book
                  </h3>
                  <p className="text-sm text-gray-600">
                    Saturday, March 18, 9:30PM
                  </p>
                  <p className="text-sm text-gray-500">ONLINE EVENT - Attend anywhere</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
