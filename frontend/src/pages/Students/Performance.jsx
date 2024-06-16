import React from 'react';
import Sidebar from './Sidebar';
import { Line } from 'react-chartjs-2';

const PerformanceSection = () => {
  // Sample performance data
  const performanceData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    marks: [80, 85, 90, 88, 92, 85], // Sample marks for each month
    totalMarks: 520 // Sample total marks for the year
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
    <div className="flex flex-col md:flex-row">
      <div className="flex-shrink-0 w-full md:w-[250px]">
        <Sidebar />
      </div>
      <div className="flex-1 p-5">
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
