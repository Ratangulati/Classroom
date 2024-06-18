import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Line } from 'react-chartjs-2';

const PerformanceSection = () => {
  const performanceData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    marks: [80, 85, 90, 88, 92, 85], // Sample marks for each month
    totalMarks: 520 // Sample total marks for the year
  };
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Line chart data
  const lineChartData = {
    labels: performanceData.months,
    datasets: [
      {
        label: 'Performance Trends',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        data: performanceData.marks
      }
    ]
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h2 className="text-2xl mb-5">Performance</h2>
        <div className="bg-white rounded-lg shadow-lg p-5">
          <div className="mb-5">
            <Line
              data={lineChartData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
          <div className="font-bold">Total Marks: {performanceData.totalMarks}</div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSection;
