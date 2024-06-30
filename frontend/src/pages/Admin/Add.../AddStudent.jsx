import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { HiEye, HiHashtag, HiOutlineUser } from 'react-icons/hi';
import Sidebar from '../Sidebar';


const AddStudent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [newStudent, setNewStudent] = useState({ name: '', registrationNumber: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [className, setClassName] = useState('');
  const navigate = useNavigate();

  const handleCreateStudent = async (e) => {
    e.preventDefault();

    if (newStudent.name.trim() === '' || newStudent.registrationNumber.trim() === '' || newStudent.password.trim() === '') {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/students/', {
        name: newStudent.name,
        registrationNumber: newStudent.registrationNumber,
        password: newStudent.password,
      });

      console.log('Student added:', response.data);
      navigate(-1);
    } catch (error) {
      console.error('Error adding student:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to add student. Please try again.');
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-100 shadow-xl rounded-lg p-8 mb-8 h-screen flex flex-col justify-center items-center">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Student to {className}</h2>
        <form onSubmit={handleCreateStudent} className="mb-4 flex flex-col">
          <div className="mb-4">
            <label htmlFor="studentName" className="flex items-center block text-gray-700 font-bold mb-2">
            <HiOutlineUser className="mr-2" /> Name
            </label>
            <input
              id="studentName"
              type="text"
              placeholder="Enter Student name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue border border-gray-300"
              required
            />

            <label htmlFor="registrationNumber" className="flex items-center block text-gray-700 font-bold mb-2 mt-3">
            <HiHashtag className="mr-2" /> Registration Number
            </label>
            <input
              id="registrationNumber"
              type="text"
              placeholder="Enter registration number"
              value={newStudent.registrationNumber}
              onChange={(e) => setNewStudent({ ...newStudent, registrationNumber: e.target.value })}
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue border border-gray-300"
              required
            />

            <label htmlFor="password" className="flex items-center block text-gray-700 font-bold mb-2 mt-3">
            <HiEye className="mr-2" /> Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={newStudent.password}
              onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue border border-gray-300"
              required
            />
          </div>
          <div className="flex justify-between gap-2">
            <button type="submit"  className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center">
            <FaPlus className="mr-2" /> Create Student
            </button>
            <button
                onClick={() => navigate(-1)}
                className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                <FaArrowLeft className="mr-2" /> Back
              </button>
          </div>
        </form>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
      </div>
    </div>
  );
};

export default AddStudent;