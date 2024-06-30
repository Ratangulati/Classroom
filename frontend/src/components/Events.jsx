import React from 'react';
import { useNavigate } from "react-router-dom";
import { HiOutlineChevronRight } from "react-icons/hi";
import axios from 'axios'


const Events = ({ events, role, refreshEvents }) => {

  const navigate = useNavigate();
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  const apiUrl = import.meta.env.VITE_API_URL;


  const handleAddEvent = () => {
    navigate("/create-event");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/v1/events/${id}`);
      refreshEvents();
    } catch (error) {
      console.error("Error deleting events:", error);
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        {role === 'admin' && (
          <button
          onClick={handleAddEvent}
          className="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
        >
          Add Event <HiOutlineChevronRight className="ml-2" /> 
        </button>
        )}
      </div>
      {sortedEvents.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <ul className="space-y-4">
          {sortedEvents.map((event) => (
            <li key={event._id} className="border-b pb-2">
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>
              {role === 'admin' && (
                <div className="mt-2">
                  {/* <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button> */}
                  <button
                      onClick={() => handleDelete(event._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;
