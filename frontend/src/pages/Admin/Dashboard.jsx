import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Announcement from '../../components/Announcement';
import Events from '../../components/Events';
import { HiOutlineAcademicCap, HiOutlineUser, HiOutlineUserGroup } from 'react-icons/hi';

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    events: [],
    announcements: [],
    classes: [],
    students: [],
    teachers: [],
  });
  const adminName = JSON.parse(localStorage.getItem('user'))?.email || 'Admin';

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [events, announcements, classes, students, teachers] = await Promise.all([
        axios.get('https://classroom-api-beta.vercel.app/events/getall'),
        axios.get('https://classroom-api-beta.vercel.app/announcement/getall'),
        axios.get('https://classroom-api-beta.vercel.app/class/getall'),
        axios.get('https://classroom-api-beta.vercel.app/students/getall'),
        axios.get('https://classroom-api-beta.vercel.app/teachers/getall'),
      ]);

      setDashboardData({
        events: events.data.events || [],
        announcements: announcements.data.announcement || [],
        classes: classes.data.classes || [],
        students: students.data.students || [],
        teachers: teachers.data.teachers || [],
      });
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
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {adminName}</h1>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Students"
              value={dashboardData.students.length}
              icon={<HiOutlineAcademicCap className="w-6 h-6" />}
            />
            <StatCard
              title="Total Teachers"
              value={dashboardData.teachers.length}
              icon={<HiOutlineUser className="w-6 h-6" />}
            />
            <StatCard
              title="Total Classes"
              value={dashboardData.classes.length}
              icon={<HiOutlineUserGroup className="w-6 h-6" />}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Announcement announcements={dashboardData.announcements.slice(0, 5)} role="admin" refreshAnnouncements={fetchData} />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Events events={dashboardData.events.slice(0, 5)} role="admin" refreshEvents={fetchData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;