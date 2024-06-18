import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherSidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AnnouncementTeacher = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/announcements/getall');
      if (response.data && Array.isArray(response.data.announcements)) {
        setAnnouncements(response.data.announcements);
      } else {
        console.log("Error while fetching announcements: Invalid Data");
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setError('Error fetching announcements');
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/announcements', {
        announcement: announcement,
      });
      console.log('Announcement sent:', response.data);
      toast.success('Announcement sent successfully');
      setAnnouncement('');
      fetchAnnouncements(); 
    } catch (error) {
      console.error('Error sending announcement:', error);
      toast.error('Error sending announcement');
      setError('Error sending announcement');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ToastContainer /> 
      <TeacherSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} /> 
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Main content area with dynamic margin based on sidebar state */}
        <h1 className="text-3xl font-bold mb-8">Announcement</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Send New Announcement</h2>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-6">
              <label htmlFor="announcement" className="block text-gray-700 font-bold mb-2">
                Announcement
              </label>
              <textarea
                id="announcement"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue"
                placeholder="Enter your announcement"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Send Announcement
            </button>
          </form>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Announcements</h2>
          <ul className="space-y-4">
            {announcements.map((announcementItem, index) => (
              <li key={index} className="border-b pb-4">
                {announcementItem.announcement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTeacher;
