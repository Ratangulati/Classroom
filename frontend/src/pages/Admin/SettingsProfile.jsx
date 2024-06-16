import React from 'react';
import Sidebar from './Sidebar';

const SettingsProfile = () => {
  const teacherInfo = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City, Country',
    qualification: 'Master of Education',
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-5 ml-64">
        <h1 className="text-3xl font-bold mb-8">Profile Details</h1>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="mb-6">
            <p className="text-xl font-bold">Name:</p>
            <p className="text-lg">{teacherInfo.name}</p>
          </div>
          <div className="mb-6">
            <p className="text-xl font-bold">Email:</p>
            <p className="text-lg">{teacherInfo.email}</p>
          </div>
          <div className="mb-6">
            <p className="text-xl font-bold">Phone:</p>
            <p className="text-lg">{teacherInfo.phone}</p>
          </div>
          <div className="mb-6">
            <p className="text-xl font-bold">Address:</p>
            <p className="text-lg">{teacherInfo.address}</p>
          </div>
          <div className="mb-6">
            <p className="text-xl font-bold">Qualification:</p>
            <p className="text-lg">{teacherInfo.qualification}</p>
          </div>
          <button className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfile;
