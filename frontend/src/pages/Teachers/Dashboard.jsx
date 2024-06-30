import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Announcement from '../../components/Announcement';
import Events from '../../components/Events';
import { useLocation } from 'react-router-dom';
import { HiOutlineUserGroup } from 'react-icons/hi';

const apiUrl = import.meta.env.VITE_API_URL;

const TeacherDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [classes, setClasses] = useState([]);
  const location = useLocation();
  const teacherName = location.state?.name || localStorage.getItem('teacherName') || '';

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const teacherId = localStorage.getItem('teacherId');

    if (!teacherId) {
      console.error('teacherId not found in localStorage');
      return;
    }

    try {
      const [
        eventsResponse,
        announcementsResponse,
        classesResponse,
      ] = await Promise.all([
        axios.get(`${apiUrl}/api/v1/events/getall`),
        axios.get(`${apiUrl}/api/v1/announcement/getall`),
        axios.get(`${apiUrl}/api/v1/teachers/${teacherId}/classes`),
      ]);

      console.log('Events response:', eventsResponse.data);
      console.log('Announcements response:', announcementsResponse.data);
      console.log('Classes response:', classesResponse.data);

      setEvents(eventsResponse.data.events || []);
      setAnnouncements(announcementsResponse.data.announcement || []);
      setClasses(classesResponse.data.classes || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const StatCard = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div className="p-3 rounded-full bg-gray-100 text-gray-600">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {teacherName}</h1>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Classes Assigned"
              value={classes.length}
              icon={<HiOutlineUserGroup className="w-6 h-6" />}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Announcement announcements={announcements.slice(0, 5)}/>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Events events={events.slice(0, 5)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
