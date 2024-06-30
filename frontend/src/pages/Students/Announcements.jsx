import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const AnnouncementStudent = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('https://classroom-api-beta.vercel.app/announcements/getall');
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-2xl mb-5">Announcements</h1>
        <ul className="list-none p-0">
          {announcements.map((announcement) => (
            <li key={announcement._id} className="mb-2">
              <h3 className="mb-2">{announcement.announcement}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnnouncementStudent;
