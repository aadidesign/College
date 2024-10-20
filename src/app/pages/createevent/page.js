"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

const PCCOE_LOGO_URL = "/path/to/pccoe-logo.png"; // Update the logo path

export default function CreateEventPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Create Event - PCCOE Event Management</title>
        <meta
          name="description"
          content="Create an event for PCCOE with enhanced UI and UX using Next.js."
        />
      </Head>

      <header
        className={`fixed w-full p-4 transition-all duration-300 ${
          scrolled ? "bg-blue-900 shadow-lg" : "bg-transparent"
        } z-50`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="logo">
            <Link href="/">
              <img
                src={PCCOE_LOGO_URL}
                alt="PCCOE Logo"
                className="w-12 h-12 hover:scale-105 transition-transform"
              />
            </Link>
          </div>
          <nav>
            <ul className="flex space-x-4 text-white text-lg">
              <li className="hover:text-blue-300 transition-colors">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-blue-300 transition-colors">
                <Link href="/about">About</Link>
              </li>
              <li className="hover:text-blue-300 transition-colors">
                <Link href="/events">Events</Link>
              </li>
              <li className="hover:text-blue-300 transition-colors">
                <Link href="/createevent">Create Event</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-400 text-white text-center">
          <div className="container mx-auto">
            <h1 className="text-6xl font-extrabold mb-6 animate-fade-in-down">
              Create an Event
            </h1>
            <p className="text-2xl mb-8">
              Organize and manage your event for PCCOE with our advanced features.
            </p>
            <Link
              href="#form-section"
              className="bg-white text-blue-600 hover:bg-blue-700 hover:text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </section>

        <section id="form-section" className="py-20 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-center text-4xl font-bold mb-10 text-blue-900">
              Event Details
            </h2>
            <form className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label
                    htmlFor="event-name"
                    className="mb-2 text-lg font-semibold text-blue-800"
                  >
                    Event Name
                  </label>
                  <input
                    type="text"
                    id="event-name"
                    placeholder="Enter event name"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="event-date"
                    className="mb-2 text-lg font-semibold text-blue-800"
                  >
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="event-date"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="event-start-time"
                    className="mb-2 text-lg font-semibold text-blue-800"
                  >
                    Event Start Time
                  </label>
                  <input
                    type="time"
                    id="event-start-time"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="event-end-time"
                    className="mb-2 text-lg font-semibold text-blue-800"
                  >
                    Event End Time
                  </label>
                  <input
                    type="time"
                    id="event-end-time"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="event-venue"
                    className="mb-2 text-lg font-semibold text-blue-800"
                  >
                    Event Venue
                  </label>
                  <input
                    type="text"
                    id="event-venue"
                    placeholder="Enter event venue"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="event-type"
                    className="mb-2 text-lg font-semibold text-blue-800"
                  >
                    Event Type
                  </label>
                  <select
                    id="event-type"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    required
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Competition">Competition</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="participants-number"
                  className="mb-2 text-lg font-semibold text-blue-800"
                >
                  Number of Participants
                </label>
                <input
                  type="number"
                  id="participants-number"
                  placeholder="Enter number of participants"
                  className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label
                    htmlFor="coordinator-name"
                    className="mb-2 text-lg font-semibold text-blue-800"
                  >
                    Event Coordinator Name
                  </label>
                  <input
                    type="text"
                    id="coordinator-name"
                    placeholder="Enter coordinator name"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="coordinator-contact"
                    className="mb-2 text-lg font-semibold text-blue-800"
                  >
                    Event Coordinator Contact
                  </label>
                  <input
                    type="text"
                    id="coordinator-contact"
                    placeholder="Enter coordinator contact details"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="registration-link"
                  className="mb-2 text-lg font-semibold text-blue-800"
                >
                  Event Registration Link
                </label>
                <input
                  type="url"
                  id="registration-link"
                  placeholder="Enter registration link (if any)"
                  className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="event-banner"
                  className="mb-2 text-lg font-semibold text-blue-800"
                >
                  Upload Event Banner
                </label>
                <input
                  type="file"
                  id="event-banner"
                  className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-4 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                Create Event
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 py-8 text-white">
        <div className="container mx-auto text-center">
          <p className="text-lg font-semibold">
            &copy; 2024 PCCOE Event Management. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
