import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(true); // State for sidebar toggle

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/events/getall');
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Error fetching events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/events', { event: newEvent });
      setEvents([...events, response.data.event]);
      setNewEvent('');
      toast.success('Event added successfully');
    } catch (error) {
      console.error('Error adding event:', error);
      setError(error.response?.data?.error || 'Error adding event');
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-bold mb-8">Events & Calendar</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <div className="mb-6">
            <p className="text-xl font-bold">Current Time:</p>
            <p className="text-lg">{new Date().toLocaleString()}</p>
          </div>
          <div className="mb-6">Calendar Placeholder</div>
          <form onSubmit={addEvent} className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
            <div className="flex items-center">
              <input
                type="text"
                value={newEvent}
                onChange={(e) => setNewEvent(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter event"
              />
              <button
                type="submit"
                className="ml-4 bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Add Event
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 mb-6">{error}</p>}
          <div>
            <h2 className="text-2xl font-bold mb-4">Events</h2>
            {events.map((event, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4 shadow-md">
                {event}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
