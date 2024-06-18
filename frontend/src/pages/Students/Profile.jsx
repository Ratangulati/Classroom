import React, { useState } from 'react';
import Sidebar from './Sidebar';

const ProfileSection = () => {
  const studentProfile = {
    name: 'John Doe',
    age: 18,
    grade: '12th',
    school: 'Example High School',
    email: 'john.doe@example.com'
  };
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-2xl mb-5">Profile</h1>
        <div>
          <div className="mb-5">
            <span className="font-bold">Name:</span>
            <span className="ml-2">{studentProfile.name}</span>
          </div>
          <div className="mb-5">
            <span className="font-bold">Age:</span>
            <span className="ml-2">{studentProfile.age}</span>
          </div>
          <div className="mb-5">
            <span className="font-bold">Grade:</span>
            <span className="ml-2">{studentProfile.grade}</span>
          </div>
          <div className="mb-5">
            <span className="font-bold">School:</span>
            <span className="ml-2">{studentProfile.school}</span>
          </div>
          <div className="mb-5">
            <span className="font-bold">Email:</span>
            <span className="ml-2">{studentProfile.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;

