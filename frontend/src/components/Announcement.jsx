import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Announcement = ({ announcements, role }) => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/create-announcement");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 max-h-[36rem] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Announcements</h2>
        {role === 'admin' && (
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Announcement
        </button>
        )}
      </div>
      <div className="divide-y divide-gray-200">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="py-4">
            <p className="text-base">{announcement.announcement}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
