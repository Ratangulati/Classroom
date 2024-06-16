import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Performance = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const schoolPerformanceData = {
    averageScore: 85,
    totalStudents: 100,
  };

  const individualPerformanceData = [
    { id: 1, name: 'John Doe', score: 90 },
    { id: 2, name: 'Jane Smith', score: 85 },
    { id: 3, name: 'Michael Johnson', score: 92 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-bold mb-8">School Performance</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <p className="text-xl mb-4">Average Score: {schoolPerformanceData.averageScore}</p>
          <p className="text-xl">Total Students: {schoolPerformanceData.totalStudents}</p>
        </div>
        <h2 className="text-2xl font-bold mb-4">Individual Performance</h2>
        <div className="bg-white shadow-lg rounded-lg p-8">
          {individualPerformanceData.map((student) => (
            <div key={student.id} className="mb-4">
              <p className="text-lg font-bold">{student.name}</p>
              <p>Score: {student.score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Performance;
