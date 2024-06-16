// TeacherProfileSection.js (using Tailwind CSS)
import React, { useState } from 'react';
import Sidebar from './Sidebar';

const TeacherProfileSection = () => {
  const [teacherInfo, setTeacherInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City, Country',
    qualification: 'Master of Education',
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5 ml-64">
        <h1 className="text-2xl mb-5">Profile Details</h1>
        <div className="max-w-md">
          <div className="mb-4">
            <label className="font-bold">Name:</label>
            <p>{teacherInfo.name}</p>
          </div>
          <div className="mb-4">
            <label className="font-bold">Email:</label>
            <p>{teacherInfo.email}</p>
          </div>
          <div className="mb-4">
            <label className="font-bold">Phone:</label>
            <p>{teacherInfo.phone}</p>
          </div>
          <div className="mb-4">
            <label className="font-bold">Address:</label>
            <p>{teacherInfo.address}</p>
          </div>
          <div className="mb-4">
            <label className="font-bold">Qualification:</label>
            <p>{teacherInfo.qualification}</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4">Edit Profile</button>
      </div>
    </div>
  );
};

export default TeacherProfileSection;
