import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Announcement from '../../components/Announcement';
import Events from '../../components/Events';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const TeacherDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
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
      axios.get('http://localhost:3000/api/v1/events/getall'),
      axios.get('http://localhost:3000/api/v1/announcement/getall'),
      axios.get(`http://localhost:3000/api/v1/teachers/${teacherId}/classes`),
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
      <h2 className="text-2xl mb-5 text-gray-800">Welcome, {teacherName}</h2>
        <section className="mb-8">
          <h2 className="text-2xl mb-4">Overview</h2>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md flex-1 max-w-sm">
              <h3 className="text-lg text-blue-500 font-semibold mb-2">Classes Assigned</h3>
              <p className="text-gray-700">{classes.length}</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mb-4"><Announcement announcements={announcements}/></h2>
          {/* Placeholder for recent activity list */}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mb-4"><Events events={events} /></h2>
          {/* Placeholder for upcoming events calendar or list */}
        </section>
      </div>
    </div>
  );
};

export default TeacherDashboard;
