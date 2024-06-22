import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Announcement from '../../components/Announcement';
import Events from '../../components/Events';

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [classes, setClasses] = useState([]); 
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        eventsResponse,
        announcementsResponse,
        classesResponse,
        studentsResponse,
        teachersResponse,
      ] = await Promise.all([
        axios.get('http://localhost:3000/api/v1/events/getall'),
        axios.get('http://localhost:3000/api/v1/announcement/getall'),
        axios.get('http://localhost:3000/api/v1/class/getall'),
        axios.get('http://localhost:3000/api/v1/students/getall'),
        axios.get('http://localhost:3000/api/v1/teachers/getall'),
      ]);

      setEvents(eventsResponse.data.events || []);
      setAnnouncements(announcementsResponse.data.announcement || []);
      setClasses(classesResponse.data.classes || []);
      setStudents(studentsResponse.data.students || []);
      setTeachers(teachersResponse.data.teachers || []);
    } catch (error) {
      console.error('Error fetching data:', error);
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
              <p className="text-base text-gray-600">{students.length}</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md flex-1 max-w-xs hover:translate-y-[-5px] transition-transform cursor-pointer">
              <h3 className="text-xl mb-3 text-blue-500">Total Teachers</h3>
              <p className="text-base text-gray-600">{teachers.length}</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md flex-1 max-w-xs hover:translate-y-[-5px] transition-transform cursor-pointer">
              <h3 className="text-xl mb-3 text-blue-500">Total Classes</h3>
              <p className="text-base text-gray-600">{classes.length}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Announcement announcements={announcements} role="admin" />
          <Events events={events} role="admin" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

