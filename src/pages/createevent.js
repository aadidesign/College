"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

const PCCOE_LOGO_URL = "/path/to/pccoe-logo.png"; // Update the logo path

export default function CreateEventPage() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    eventVenue: "",
    eventType: "Workshop",
    participantsNumber: "",
    coordinatorName: "",
    coordinatorContact: "",
    registrationLink: "",
    eventBanner: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "event-banner") {
      setFormData({ ...formData, eventBanner: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:3000/api/lead/application", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit the event. Please try again.");
      }

      alert("Event created successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
              <Image
                src={PCCOE_LOGO_URL}
                alt="PCCOE Logo"
                width={48} // Set the width of the logo
                height={48} // Set the height of the logo
                className="hover:scale-105 transition-transform"
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
            <form
              className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl space-y-8"
              onSubmit={handleSubmit}
            >
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
                    id="eventName"
                    placeholder="Enter event name"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    value={formData.eventName}
                    onChange={handleInputChange}
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
                    id="eventDate"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    value={formData.eventDate}
                    onChange={handleInputChange}
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
                    id="eventStartTime"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    value={formData.eventStartTime}
                    onChange={handleInputChange}
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
                    id="eventEndTime"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    value={formData.eventEndTime}
                    onChange={handleInputChange}
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
                    id="eventVenue"
                    placeholder="Enter event venue"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    value={formData.eventVenue}
                    onChange={handleInputChange}
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
                    id="eventType"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    value={formData.eventType}
                    onChange={handleInputChange}
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
                  id="participantsNumber"
                  placeholder="Enter number of participants"
                  className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                  value={formData.participantsNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="coordinator-name"
                  className="mb-2 text-lg font-semibold text-blue-800"
                >
                  Coordinator Name
                </label>
                <input
                  type="text"
                  id="coordinatorName"
                  placeholder="Enter coordinator's name"
                  className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                  value={formData.coordinatorName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="coordinator-contact"
                  className="mb-2 text-lg font-semibold text-blue-800"
                >
                  Coordinator Contact
                </label>
                <input
                  type="tel"
                  id="coordinatorContact"
                  placeholder="Enter coordinator's contact number"
                  className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                  value={formData.coordinatorContact}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="registration-link"
                  className="mb-2 text-lg font-semibold text-blue-800"
                >
                  Registration Link
                </label>
                <input
                  type="url"
                  id="registrationLink"
                  placeholder="Enter registration link"
                  className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                  value={formData.registrationLink}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="event-banner"
                  className="mb-2 text-lg font-semibold text-blue-800"
                >
                  Event Banner
                </label>
                <input
                  type="file"
                  id="event-banner"
                  className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                  onChange={handleInputChange}
                  accept="image/*"
                  required
                />
              </div>

              {loading ? (
                <p className="text-center text-blue-600 font-semibold">
                  Submitting event...
                </p>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-md font-bold hover:bg-blue-700 transition-all duration-300"
                >
                  Create Event
                </button>
              )}

              {error && (
                <p className="text-red-600 text-center mt-4">{error}</p>
              )}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
