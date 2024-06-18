import React, { useRef, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Exams = () => {
  const chartRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Sample exam results data
  const examResultsData = {
    subjects: ['Math', 'Science', 'English', 'History'],
    results: [80, 75, 90, 85] // Sample results out of 100
  };

  // Bar chart data
  const barChartData = {
    labels: examResultsData.subjects,
    datasets: [
      {
        label: 'Exam Results',
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        borderWidth: 1,
        hoverBackgroundColor: '#0056b3',
        hoverBorderColor: '#0056b3',
        data: examResultsData.results
      }
    ]
  };

  // Chart options
  const chartOptions = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
        max: 100
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-2xl mb-5">Exam Results</h1>
        <div className="bg-white rounded-lg shadow-md p-5 mb-5">
          {examResultsData.subjects.map((subject, index) => (
            <div key={index}>
              <h3 className="text-lg mb-2">{subject}</h3>
              <p className="text-gray-700 mb-4">Score: {examResultsData.results[index]}%</p>
            </div>
          ))}
          <div className="w-full max-w-[600px] mx-auto">
            <Bar
              ref={chartRef}
              data={barChartData}
              options={chartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exams;
