import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddStudent = () => {
  // const { classId } = useParams();
  const [newStudent, setNewStudent] = useState({ name: '', registrationNumber: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [className, setClassName] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchClassName = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/api/v1/class/${classId}`);
  //       setClassName(response.data.class.className);
  //     } catch (error) {
  //       console.error('Error fetching class name:', error);
  //       setErrorMessage('Failed to fetch class name');
  //     }
  //   };

  //   fetchClassName();
  // }, [classId]);

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

  return (
    <div className="bg-gray-100 shadow-xl rounded-lg p-8 mb-8 h-screen flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Student to {className}</h2>
        <form onSubmit={handleCreateStudent} className="mb-4 flex flex-col">
          <div className="mb-4">
            <label htmlFor="studentName" className="block text-gray-700 font-bold mb-2">
              Name
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

            <label htmlFor="registrationNumber" className="block text-gray-700 font-bold mb-2 mt-2">
              Registration Number
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

            <label htmlFor="password" className="block text-gray-700 font-bold mb-2 mt-2">
              Password
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
          <div className="flex justify-between">
            <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Add Student
            </button>
            <button type="button" onClick={() => navigate(-1)} className="bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg ml-4 hover:bg-gray-300 transition duration-200">
              Back
            </button>
          </div>
        </form>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AddStudent;