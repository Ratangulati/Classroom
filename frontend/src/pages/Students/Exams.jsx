import React, { useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Exams = () => {
  const chartRef = useRef(null);

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
    <div className="flex flex-col md:flex-row md:pl-[240px]">
      <div className="flex-shrink-0 w-full md:w-[250px]">
        <Sidebar />
      </div>
      <div className="flex-1 p-5">
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
