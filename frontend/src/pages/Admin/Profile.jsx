import React, { useState } from 'react';
import Sidebar from './Sidebar';

const AdminProfile = () => {
  const [isOpen, setIsOpen] = useState(true);
  const adminUser = JSON.parse(localStorage.getItem('user')) || {};
  const { name, email, password, userId } = adminUser;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-semibold mb-8">Profile</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-5">
            <span className="font-bold text-gray-700">Name:</span>
            <span className="ml-2 text-gray-900">{name}</span>
          </div>
          <div className="mb-5">
            <span className="font-bold text-gray-700">Email:</span>
            <span className="ml-2 text-gray-900">{email}</span>
          </div>
          <div className="mb-5">
            <span className="font-bold text-gray-700">User ID:</span>
            <span className="ml-2 text-gray-900">{userId}</span>
          </div>
          <div className="mb-5">
            <span className="font-bold text-gray-700">Password:</span>
            <span className="ml-2 text-gray-900">{password}</span>
          </div>
          {/* <div className="mb-5">
            <span className="font-bold text-gray-700">School:</span>
            <span className="ml-2 text-gray-900">{teacher.school}</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
