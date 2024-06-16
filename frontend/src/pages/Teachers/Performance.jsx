// CheckPerformanceSection.js (using Tailwind CSS)
import React from 'react';
import Sidebar from './Sidebar';

const CheckPerformanceSection = () => {
  // Sample data for school performance
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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5 ml-64">
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
