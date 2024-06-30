import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from '../Sidebar';


const AddEvent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: null,
    description: "",
  });
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const addEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
       `${apiUrl}/api/v1/events`,
        newEvent
      );
      setEvents([...events, response.data.event]);
      setNewEvent({ title: "", date: null, description: "" });
      setShowNewEvent(true);
      navigate(-1)
      toast.success("Event added successfully");
    } catch (error) {
      console.error("Error adding event:", error);
      setError("Error adding event");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewEvent({ ...newEvent, date });
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
    
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Add Event</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <form onSubmit={addEvent} className="mb-6">

            <div className="mb-4">

              <label className="block text-gray-700 mb-2">Event Title:</label>

              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Event Date:</label>
              <DatePicker
                selected={newEvent.date}
                onChange={handleDateChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Event Description:
              </label>
              <textarea
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none">
              Add Event
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-50 transition duration-300 ml-2">
              Back
          </button>
          </form>

          {showNewEvent && (
            <div className="max-h-[2rem] overflow-y-auto bg-gray-100 p-4 rounded-lg mb-4 shadow-md">
              <p>
                <strong>{newEvent.title}</strong>
              </p>
              <p>
                {newEvent.date
                  ? new Date(newEvent.date).toLocaleDateString()
                  : ""}
              </p>
              <p>{newEvent.description}</p>

            </div>
          )}
        </div>
      </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddEvent;
