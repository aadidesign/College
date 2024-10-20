"use client"; // Mark this component as a Client Component

// Import necessary modules
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import './page.css'; // Import CSS for styling

const PCCOE_LOGO_URL = '/path/to/pccoe-logo.png'; // Update the logo path

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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Create Event - PCCOE Event Management</title>
        <meta name="description" content="Create an event for PCCOE with enhanced UI and UX using Next.js." />
      </Head>

      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="logo">
            <Link href="/">
              <img src={PCCOE_LOGO_URL} alt="PCCOE Logo" width="50" height="50" />
            </Link>
          </div>
          <nav>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/createevent">Create Event</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="container">
            <h1>Create an Event</h1>
            <p>Organize and manage your event for PCCOE with our advanced features and enhanced UI/UX.</p>
            <Link href="#form-section" className="btn-primary">Get Started</Link>
          </div>
        </section>

        <section id="form-section" className="form-section">
          <div className="container">
            <h2>Event Details</h2>
            <form>
              <div className="form-group">
                <label htmlFor="event-name">Event Name</label>
                <input type="text" id="event-name" placeholder="Enter event name" required />
              </div>
              <div className="form-group">
                <label htmlFor="event-date">Event Date</label>
                <input type="date" id="event-date" required />
              </div>
              <div className="form-group">
                <label htmlFor="event-start-time">Event Start Time</label>
                <input type="time" id="event-start-time" required />
              </div>
              <div className="form-group">
                <label htmlFor="event-end-time">Event End Time</label>
                <input type="time" id="event-end-time" required />
              </div>
              <div className="form-group">
                <label htmlFor="event-venue">Event Venue</label>
                <input type="text" id="event-venue" placeholder="Enter event venue" required />
              </div>
              <div className="form-group">
                <label htmlFor="event-type">Event Type</label>
                <select id="event-type" required>
                  <option value="Workshop">Workshop</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Competition">Competition</option>
                  <option value="Webinar">Webinar</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="participants-number">Number of Participants</label>
                <input type="number" id="participants-number" placeholder="Enter number of participants" required />
              </div>
              <div className="form-group">
                <label htmlFor="coordinator-name">Event Coordinator Name</label>
                <input type="text" id="coordinator-name" placeholder="Enter coordinator name" required />
              </div>
              <div className="form-group">
                <label htmlFor="coordinator-contact">Event Coordinator Contact</label>
                <input type="text" id="coordinator-contact" placeholder="Enter coordinator contact details" required />
              </div>
              <div className="form-group">
                <label htmlFor="registration-link">Event Registration Link</label>
                <input type="url" id="registration-link" placeholder="Enter registration link (if any)" />
              </div>
              <div className="form-group">
                <label htmlFor="event-banner">Upload Event Banner</label>
                <input type="file" id="event-banner" />
              </div>
              <button type="submit" className="btn-primary">Create Event</button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2024 PCCOE Event Management. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
