import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

const PCCOE_LOGO_URL = "/path/to/pccoe-logo.png"; // Update the logo path

export default function CreateEventPage() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    venue_id: "",
    date: "",
    time: "",
    inventory_id: "",
    additional_details: "",
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
      const response = await fetch("/api/clublead/event/create/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          venue_id: formData.venue_id,
          date: formData.date,
          time: formData.time,
          inventory_id: formData.inventory_id,
          additional_details: formData.additional_details,
        }),
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
         <script src="https://cdn.tailwindcss.com"></script>
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
                width={48} 
                height={48} 
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
                <Link href="/event">Events</Link>
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
                    htmlFor="title"
                    className="mb-2 text-lg font-semibold text-blue-800"
                  >
                    Event Name
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Enter event name"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="date"
                    className="mb-2 text-lg font-semibold text-blue-800"
                  >
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="time"
                    className="mb-2 text-lg font-semibold text-blue-800"
                  >
                    Event Start Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="venue_id"
                    className="mb-2 text-lg font-semibold text-blue-800"
                  >
                    Event Venue
                  </label>
                  <input
                    type="text"
                    id="venue_id"
                    placeholder="Enter event venue"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    value={formData.venue_id}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="description"
                    className="mb-2 text-lg font-semibold text-blue-800"
                  >
                    Event Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Enter event description"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="inventory_id"
                    className="mb-2 text-lg font-semibold text-blue-800"
                  >
                    Inventory ID
                  </label>
                  <input
                    type="text"
                    id="inventory_id"
                    placeholder="Enter inventory ID"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    value={formData.inventory_id}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="additional_details"
                    className="mb-2 text-lg font-semibold text-blue-800"
                  >
                    Additional Details
                  </label>
                  <textarea
                    id="additional_details"
                    placeholder="Enter any additional details"
                    className="border border-gray-300 rounded-md p-4 focus:ring-2 focus:ring-blue-600"
                    value={formData.additional_details}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Submit
                </button>
              )}

              {error && <p className="text-red-600">{error}</p>}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
