import React from "react";
import { useNavigate } from "react-router-dom";

const Events = ({ events, role }) => {
  const navigate = useNavigate();

  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleAddEvent = () => {
    navigate("/create-event");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 max-h-[36rem] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Events</h2>
        {role === 'admin' && (
          <button
          onClick={handleAddEvent}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Event
        </button>
        )}
      </div>
      <div className="divide-y divide-gray-200">
        {sortedEvents.map((event) => (
          <div key={event._id} className="py-4">
            <p className="text-base">{event.title}</p>
            <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
