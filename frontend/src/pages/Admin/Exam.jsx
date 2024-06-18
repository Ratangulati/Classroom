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
  const [isOpen, setIsOpen] = useState(true); // State for sidebar toggle
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/exam/getall');
      setExamData(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (error) {
      console.error('Error fetching exams:', error);
      setError('Error fetching exams');
    }
  };

  const handleAddExam = async (e) => {
    e.preventDefault();
    const newExam = { name, registrationNumber, className, marks: parseInt(marks) };
    try {
      const response = await axios.post('http://localhost:3000/api/v1/exam', newExam);
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} /> {/* Sidebar component with isOpen and toggleSidebar props */}
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-bold mb-8">Exam Details</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <form onSubmit={handleAddExam} className="max-w-md">
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-gray"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="registrationNumber" className="block mb-2">Registration Number:</label>
              <input
                type="text"
                id="registrationNumber"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-gray"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="className" className="block mb-2">Class:</label>
              <input
                type="text"
                id="className"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-gray"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="marks" className="block mb-2">Marks:</label>
              <input
                type="number"
                id="marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-gray"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Add Exam
            </button>
          </form>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Exam Summary</h2>
          <h3 className="mb-3">Total Marks: {calculateTotalMarks()}</h3>
          <div>
            <h3 className="text-lg font-semibold mb-3">Exam Details:</h3>
            <ul className="list-disc list-inside">
              {examData.map((exam, index) => (
                <li key={index} className="mb-3">
                  Name: {exam.name}, Registration Number: {exam.registrationNumber}, Class: {exam.className}, Marks: {exam.marks}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
