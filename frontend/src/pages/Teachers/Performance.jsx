import React, { useState } from 'react';
import Sidebar from './Sidebar';

const CheckPerformanceSection = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const schoolPerformanceData = {
    averageScore: 85,
    totalStudents: 100,
  };

  // Sample data for individual student performance
  const individualPerformanceData = [
    { id: 1, name: 'John Doe', score: 90 },
    { id: 2, name: 'Jane Smith', score: 85 },
    { id: 3, name: 'Michael Johnson', score: 92 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-5">
          <h2 className="text-2xl mb-5">School Performance</h2>
          <div className="bg-white rounded-lg shadow-md p-4 mb-5">
            <p>Average Score: {schoolPerformanceData.averageScore}</p>
            <p>Total Students: {schoolPerformanceData.totalStudents}</p>
          </div>
          <h2 className="text-2xl mb-5">Individual Performance</h2>
          {individualPerformanceData.map((student) => (
            <div key={student.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
              <p>
                {student.name}: {student.score}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckPerformanceSection;
