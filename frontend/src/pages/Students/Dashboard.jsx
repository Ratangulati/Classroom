import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

const StudentDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const studentName = location.state?.name || '';

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
      <h2 className="text-2xl mb-5 text-gray-800">Welcome, {studentName}</h2>
        <section className="mb-10">
          <h2 className="text-2xl mb-5 text-gray-800">Overview</h2>
          <div className="flex gap-5">
            <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 cursor-pointer flex-1 max-w-[250px]">
              <h3 className="text-xl mb-2 text-blue-500">Assignments</h3>
              <p className="text-lg text-gray-700">5</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 cursor-pointer flex-1 max-w-[250px]">
              <h3 className="text-xl mb-2 text-blue-500">Performance</h3>
              <p className="text-lg text-gray-700">500</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 cursor-pointer flex-1 max-w-[250px]">
              <h3 className="text-xl mb-2 text-blue-500">Term</h3>
              <p className="text-lg text-gray-700">1</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl mb-5 text-gray-800">Recent Activity</h2>
          {/* Add a list of recent activity items */}
        </section>

        <section className="mb-10">
          <h2 className="text-2xl mb-5 text-gray-800">Upcoming Events</h2>
          {/* Add a calendar or list of upcoming events */}
        </section>

        {/* Add more sections for other parts of the admin dashboard */}
      </div>
    </div> 
  );
};

export default StudentDashboard;
