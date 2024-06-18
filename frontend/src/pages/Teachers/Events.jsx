import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const EventSection = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/events/getall');
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Error fetching events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Function to add a new event
  const addEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/events', {
        event: newEvent,
      });
      setEvents([...events, response.data.event]);
      setNewEvent('');
    } catch (error) {
      console.error('Error adding event:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Error adding event');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-2xl">Events & Calendar</h1>
        <div className="mt-4">Current Time: {new Date().toLocaleString()}</div>
        <div className="border border-gray-300 rounded-lg p-4 mt-4">
          {/* Display Calendar Here */}
          {/* For example: <Calendar /> */}
          Calendar
        </div>
        <form onSubmit={addEvent} className="mt-4 flex items-center">
          <h2 className="text-lg">Add New Event</h2>
          <input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Enter Event"
            className="p-2 border border-gray-300 rounded-lg ml-4"
          />
          <button
            type="submit"
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Event
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="mt-4">
          <h2 className="text-lg">Events</h2>
          {events.map((event, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded-lg mt-2">
              {event}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventSection;
