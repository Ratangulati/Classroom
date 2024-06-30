import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Announcement from '../../components/Announcement';
import Events from '../../components/Events';
import { HiClipboardList, HiOutlineAcademicCap, HiOutlineUser, HiOutlineUserGroup } from 'react-icons/hi';


const apiUrl = import.meta.env.VITE_API_URL;

const StudentDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    events: [],
    announcements: [],
    assignments: [],
    student: null,
    classes: [],
  });
  const [error, setError] = useState(null);
  const studentName = localStorage.getItem('studentName') || '';
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    if (!studentId) {
      setError('Student ID not found. Please log in again.');
      return;
    }
    fetchDashboardData();
  }, [studentId]);

  const fetchDashboardData = async () => {
    try {
      const [events, announcements, student, allClasses] = await Promise.all([
        axios.get(`${apiUrl}/events/getall`),
        axios.get(`${apiUrl}/announcement/getall`),
        axios.get(`${apiUrl}/students/${studentId}`),
        axios.get(`${apiUrl}/class/getall`),
      ]);

      const filteredClasses = allClasses.data.classes.filter(cls =>
        cls.students.some(std => std.registrationNumber === student.data.student.registrationNumber)
      );

      const assignmentsResponses = await Promise.all(
        filteredClasses.map(cls => axios.get(`${API_BASE_URL}/assignments/class/${cls._id}`))
      );

      const allAssignments = assignmentsResponses.flatMap(response => response.data.assignments);

      console.log(dashboardData)
      setDashboardData({
        events: events.data.events || [],
        announcements: announcements.data.announcement || [],
        assignments: allAssignments,
        student: student.data.student,
        classes: filteredClasses,
      });
      setError(null);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Error fetching data. Please try again later.');
    }
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

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
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {studentName}</h1>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Assignments"
              value={dashboardData.assignments.length}
              icon={<HiClipboardList className="w-6 h-6" />}
            />
            <StatCard
              title="Class"
              value={dashboardData.classes.map(cls => cls.class).join(', ')}
              icon={<HiOutlineUser className="w-6 h-6" />}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Announcement announcements={dashboardData.announcements.slice(0, 5)} />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Events events={dashboardData.events.slice(0, 5)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;