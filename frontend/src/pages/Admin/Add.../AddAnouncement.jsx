import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar';

const AddAnnouncement = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [announcement, setAnnouncement] = useState('');
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/v1/announcement`, {
        announcement,
      });
      toast.success('Announcement added successfully');
      setAnnouncement('');
      navigate("/admin/dashboard");
    } catch (error) {
      console.error('Error adding announcement:', error);
      toast.error('Error adding announcement');
    }
  };


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Add Announcement</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <form onSubmit={handleAddAnnouncement} className="mb-5">
            <div className="mb-3">
              <label htmlFor="announcement" className="block mb-1">
                Announcement:
                <textarea
                  id="announcement"
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  required
                  rows={4}
                  cols={50}
                  className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              Add Announcement
            </button>
          </form>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-200 focus:ring-opacity-50"
          >
            Back
          </button>
        </div>
      </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddAnnouncement;
