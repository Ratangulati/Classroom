import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const Students = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [newStudent, setNewStudent] = useState({ name: '', registrationNumber: '', grade: '' });
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/students/getall');
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Error fetching students');
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (newStudent.name.trim() !== '' && newStudent.registrationNumber.trim() !== '' && newStudent.grade.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/students', newStudent);
        setStudents([...students, response.data.student]);
        setNewStudent({ name: '', registrationNumber: '', grade: '' });
        console.log("Student Added ");
      } catch (error) {
        console.error('Error adding student:', error);
        setError('Error adding student');
      }
    } else {
      setError('Please fill out all fields');
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-bold mb-8">Students</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
          <form onSubmit={handleAddStudent} className="mb-4 flex">
            <input
              type="text"
              placeholder="Enter student name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              className="p-2 mr-3 border border-gray-300 rounded-md flex-1"
              required
            />
            <input
              type="text"
              placeholder="Enter registration number"
              value={newStudent.registrationNumber}
              onChange={(e) => setNewStudent({ ...newStudent, registrationNumber: e.target.value })}
              className="p-2 mr-3 border border-gray-300 rounded-md flex-1"
              required
            />
            <input
              type="text"
              placeholder="Enter grade"
              value={newStudent.grade}
              onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
              className="p-2 mr-3 border border-gray-300 rounded-md flex-1"
              required
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
              Add Student
            </button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Students List</h2>
          <ul className="list-none p-0">
            {students.map((student) => (
              <li key={student.id} className="bg-white rounded-lg p-5 mb-3 shadow-md">
                {student.name} - {student.registrationNumber} - {student.grade}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Students;
