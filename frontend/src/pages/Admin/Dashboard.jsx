import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Announcement from './Announcement';
import Performance from './Performance';
import Sidebar from './Sidebar';
import EventCalender from './EventCalender';

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [studentPerformance, setStudentPerformance] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchEvents();
    fetchAnnouncements();
    fetchStudentPerformance();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/events/getall'
      );
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/announcements/getall'
      );
      setAnnouncements(response.data.announcements || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const fetchStudentPerformance = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/performance/getall'
      );
      setStudentPerformance(response.data.performance || []);
    } catch (error) {
      console.error('Error fetching student performance:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <div className="flex gap-5">
            <div className="bg-white p-5 rounded-lg shadow-md flex-1 max-w-xs hover:translate-y-[-5px] transition-transform cursor-pointer">
              <h3 className="text-xl mb-3 text-blue-500">Total Students</h3>
              <p className="text-base text-gray-600">500</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md flex-1 max-w-xs hover:translate-y-[-5px] transition-transform cursor-pointer">
              <h3 className="text-xl mb-3 text-blue-500">Total Teachers</h3>
              <p className="text-base text-gray-600">50</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md flex-1 max-w-xs hover:translate-y-[-5px] transition-transform cursor-pointer">
              <h3 className="text-xl mb-3 text-blue-500">Total Classes</h3>
              <p className="text-base text-gray-600">50</p>
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Performance studentPerformance={studentPerformance} />
          <Announcement announcements={announcements} />
        </div>
        <EventCalender events={events} /> */}
      </div>
    </div>
  );
};

export default AdminDashboard;

