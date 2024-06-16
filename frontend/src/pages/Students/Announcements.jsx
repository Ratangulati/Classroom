import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const AnnouncementStudent = () => {
  const [announcements, setAnnouncements] = useState([]);

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

  return (
    <div className="flex flex-col md:flex-row md:pl-[240px]">
      <div className="flex-shrink-0 w-full md:w-[250px]">
        <Sidebar />
      </div>
      <div className="flex-1 p-5">
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