import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Announcement from '../../components/Announcement';
import Events from '../../components/Events';

const API_BASE_URL = 'http://localhost:3000/api/v1';

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
        axios.get(`${API_BASE_URL}/events/getall`),
        axios.get(`${API_BASE_URL}/announcement/getall`),
        axios.get(`${API_BASE_URL}/students/${studentId}`),
        axios.get(`${API_BASE_URL}/class/getall`),
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h2 className="text-2xl mb-5 text-gray-800">Welcome, {studentName}</h2>
        <section className="mb-8">
          <h2 className="text-2xl mb-4">Overview</h2>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md flex-1 max-w-sm">
              <h3 className="text-lg text-blue-500 font-semibold mb-2">Assignments</h3>
              <p className="text-gray-700">{dashboardData.assignments.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex-1 max-w-sm">
              <h3 className="text-lg text-green-500 font-semibold mb-2">Class</h3>
              <p className="text-gray-700">{dashboardData.classes.map(cls => cls.class).join(', ')}</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mb-4">Announcements</h2>
          <Announcement announcements={dashboardData.announcements} />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mb-4">Events</h2>
          <Events events={dashboardData.events} />
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;