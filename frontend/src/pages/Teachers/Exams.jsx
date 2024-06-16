// CheckExamSection.js (using Tailwind CSS)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const CheckExamSection = () => {
  const [examData, setExamData] = useState([]);
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [className, setClassName] = useState('');
  const [marks, setMarks] = useState('');

  useEffect(() => {
    fetchExams(); // Fetch exams on component mount
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/exam');
      setExamData(response.data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const handleAddExam = async (e) => {
    e.preventDefault();
    const newExam = { name, registrationNumber, className, marks: parseInt(marks) };
    try {
      const response = await axios.post('http://localhost:4000/api/v1/exam', newExam);
      setExamData([...examData, response.data]);
      setName('');
      setRegistrationNumber('');
      setClassName('');
      setMarks('');
    } catch (error) {
      console.error('Error adding exam:', error);
    }
  };

  const calculateTotalMarks = () => {
    let total = 0;
    for (let i = 0; i < examData.length; i++) {
      total += examData[i].marks;
    }
    return total;
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5 ml-64">
        <h1 className="text-2xl">Exam Details</h1>
        <form onSubmit={handleAddExam} className="max-w-md mt-4">
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg mb-4 w-full"
          />
          <label className="block mb-2">Registration Number:</label>
          <input
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg mb-4 w-full"
          />
          <label className="block mb-2">Class:</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg mb-4 w-full"
          />
          <label className="block mb-2">Marks:</label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-lg mb-4 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Exam
          </button>
        </form>
        <h2 className="mt-4">Total Marks: {calculateTotalMarks()}</h2>
        <div className="mt-4">
          <h3>Exam Details:</h3>
          <ul>
            {examData.map((exam, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded-lg mt-2">
                Name: {exam.name}, Registration Number: {exam.registrationNumber}, Class: {exam.className}, Marks: {exam.marks}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CheckExamSection;
