// TeacherDashboard.js (using Tailwind CSS)
import React, { useState } from 'react';
import Sidebar from './Sidebar';

const TeacherDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <section className="mb-8">
          <h2 className="text-2xl mb-4">Overview</h2>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md flex-1 max-w-sm">
              <h3 className="text-lg text-blue-500 font-semibold mb-2">Total Students</h3>
              <p className="text-gray-700">500</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex-1 max-w-sm">
              <h3 className="text-lg text-blue-500 font-semibold mb-2">Total Teachers</h3>
              <p className="text-gray-700">50</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex-1 max-w-sm">
              <h3 className="text-lg text-blue-500 font-semibold mb-2">Total Classes</h3>
              <p className="text-gray-700">50</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mb-4">Recent Activity</h2>
          {/* Placeholder for recent activity list */}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mb-4">Upcoming Events</h2>
          {/* Placeholder for upcoming events calendar or list */}
        </section>

        {/* Additional sections for other parts of the admin dashboard */}
      </div>
    </div>
  );
};

export default TeacherDashboard;
