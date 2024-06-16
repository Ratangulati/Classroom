import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const AnnouncementTeacher = () => {
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/announcements', {
        announcement: announcement,
      });
      console.log('Announcement sent:', response.data);
      setAnnouncement('');
      fetchAnnouncements();
    } catch (error) {
      console.error('Error sending announcement:', error);
      setError('Error sending announcement');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5 ml-64">
        <div className="p-5">
          <h2 className="text-2xl mb-5">Announcement</h2>
          <form onSubmit={handleSubmit} className="mb-5">
            <label htmlFor="announcement" className="block mb-2">
              Announcement:
            </label>
            <textarea
              id="announcement"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              required
              rows={4}
              className="block w-full p-2 border border-gray-300 rounded mb-2 resize-y"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
            >
              Send Announcement
            </button>
          </form>
          <h2 className="text-2xl mb-5">Announcements</h2>
          <ul className="list-none p-0">
            {announcements.map((announcement) => (
              <li key={announcement._id} className="bg-gray-100 rounded-lg shadow-md p-4 mb-4">
                {announcement.announcement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTeacher;
