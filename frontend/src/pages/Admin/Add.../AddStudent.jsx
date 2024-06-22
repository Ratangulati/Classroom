import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddStudent = () => {
  const [newStudent, setNewStudent] = useState({ name: '', registrationNumber: '', class: '',  password: '', });
  const [errorMessage, setErrorMessage] = useState('');
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const { classId } = useParams(); 

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (newStudent.name.trim() === '' || newStudent.registrationNumber.trim() === '' || newStudent.class.trim() === '' || newStudent.class.trim() === '') {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/v1/class/${classId}/students`, newStudent);
      navigate(-1);
    } catch (error) {
      console.error('Error adding student:', error);
      setErrorMessage('Failed to add student. Please try again.');
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/class/getall');
        setClasses(response.data.classes);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
      <div className="bg-gray-100 shadow-xl rounded-lg p-8 mb-8 h-screen flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Student</h2>
        <form onSubmit={handleAddStudent} className="mb-4 flex flex-col">
          <div className="mb-4">
            <label
              htmlFor="className"
              className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Student name"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue border border-gray-300"
              required
            />

            <label
              htmlFor="className"
              className="block text-gray-700 font-bold mb-2 mt-2">
              RegistrationNumber
            </label>
            <input
              type="text"
              placeholder="Enter registrationNumber"
              value={newStudent.registrationNumber}
              onChange={(e) =>
                setNewStudent({ ...newStudent, registrationNumber: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue border border-gray-300"
              required
            />

            <label
              htmlFor="className"
              className="block text-gray-700 font-bold mb-2 mt-2">
              Class
            </label>
            <select
              id="className"
              value={newStudent.class}
              onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue border border-gray-300"
              required
            >
              <option value="">Select Class</option>
              {classes.map((classItem) => (
                <option key={classItem.id} value={classItem.class}>
                  {classItem.class}
                </option>
              ))}
            </select>

            <label
              htmlFor="className"
              className="block text-gray-700 font-bold mb-2 mt-2"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={newStudent.password}
              onChange={(e) =>
                setNewStudent({ ...newStudent, password: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue border border-gray-300"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Add Student
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg ml-4 hover:bg-gray-300 transition duration-200">
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
