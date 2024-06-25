import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FaUserCircle } from 'react-icons/fa';

const AdminProfile = () => {
  const [isOpen, setIsOpen] = useState(true);
  const adminUser = JSON.parse(localStorage.getItem('user')) || {};
  const { name, email, userId } = adminUser;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold mb-8">Admin Profile</h1>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="flex items-center mb-6">
              <FaUserCircle className="text-4xl text-indigo-500 mr-4" />
              <h2 className="text-2xl font-bold">{name}</h2>
            </div>
            <div className="flex items-center mb-4">
              <p className="font-bold text-gray-700">Email:</p>
              <p className="ml-2 text-gray-900">{email}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="font-bold text-gray-700">User ID:</p>
              <p className="ml-2 text-gray-900">{userId}</p>
            </div>
            {/* <div className="mb-5">
              <span className="font-bold text-gray-700">School:</span>
              <span className="ml-2 text-gray-900">{school}</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
