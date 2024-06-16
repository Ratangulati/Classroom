import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Exam = () => {
  const [examData, setExamData] = useState([]);
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [className, setClassName] = useState('');
  const [marks, setMarks] = useState('');

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/exam/getall');
      setExamData(Array.isArray(response.data) ? response.data : [response.data]);
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
      toast.success('Exam added successfully');
    } catch (error) {
      console.error('Error adding exam:', error);
      toast.error('Error adding exam');
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
      <ToastContainer />
      <Sidebar />
      <div className="flex-1 p-5 ml-64">
        <h1 className="text-2xl mb-5">Exam Details</h1>
        <form onSubmit={handleAddExam} className="max-w-md mb-5">
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border border-gray-300 rounded-md mb-3 block w-full"
            required
          />
          <label className="block mb-2">Registration Number:</label>
          <input
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            className="p-3 border border-gray-300 rounded-md mb-3 block w-full"
            required
          />
          <label className="block mb-2">Class:</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="p-3 border border-gray-300 rounded-md mb-3 block w-full"
            required
          />
          <label className="block mb-2">Marks:</label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            className="p-3 border border-gray-300 rounded-md mb-3 block w-full"
            required
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-200"
          >
            Add Exam
          </button>
        </form>
        <h2 className="mt-5 mb-3">Total Marks: {calculateTotalMarks()}</h2>
        <div className="mb-5">
          <h3 className="text-lg font-semibold mb-3">Exam Details:</h3>
          <ul className="list-disc list-inside">
            {examData.map((exam, index) => (
              <li key={index}>
                Name: {exam.name}, Registration Number: {exam.registrationNumber}, Class: {exam.className}, Marks: {exam.marks}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Exam;
