import React, { useState } from 'react';
import Sidebar from './Sidebar';

const StudentAttendance = () => {
  // Sample attendance data
  const attendance = [
    { id: 1, date: '2024-05-01', present: true },
    { id: 2, date: '2024-05-02', present: false },
    { id: 3, date: '2024-05-03', present: true },
    { id: 4, date: '2024-05-04', present: true },
    { id: 5, date: '2024-05-05', present: true }
  ];
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h2 className="text-2xl mb-5">Attendance</h2>
        <ul className="list-none p-0">
          {attendance.map(({ id, date, present }) => (
            <li key={id} className="flex items-center mb-5">
              <span className="font-bold">{date}</span>
              <span className={`ml-3 ${present ? 'text-green-500' : 'text-red-500'}`}>
                {present ? 'Present' : 'Absent'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentAttendance;
