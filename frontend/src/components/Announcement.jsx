import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineChevronRight } from "react-icons/hi";
import axios from 'axios'

const Announcement = ({ announcements, role, refreshAnnouncements }) => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/create-announcement");
  };

  const handleEdit = (id) => {
    navigate(`/edit-announcement/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/announcement/${id}`);
      refreshAnnouncements();
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Recent Announcements</h2>
        {role === 'admin' && (
        <button
          onClick={handleAdd}
          className="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
          >
          Add Announcement <HiOutlineChevronRight className="ml-2" /> 
        </button>
        )}
      </div>
      {announcements.length === 0 ? (
        <p>No Upcoming Announcements</p>
        ) : ( 
          <ul className="space-y-4">             
            {announcements.map((announcement) => (
              <li key={announcement._id} className="border-b pb-2">
                <p className="text-base text-gray-700">{announcement.announcement}</p>
                {role === 'admin' && (
                  <div className="mt-2">
                    {/* <button
                      onClick={() => handleEdit(announcement._id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button> */}
                    <button
                      onClick={() => handleDelete(announcement._id)}
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

export default Announcement;
