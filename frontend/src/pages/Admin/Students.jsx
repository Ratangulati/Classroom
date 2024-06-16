import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const Students = () => {
  const [newStudent, setNewStudent] = useState({ name: '', registrationNumber: '', grade: '' });
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/students/getall');
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
        const response = await axios.post('http://localhost:4000/api/v1/students', newStudent);
        setStudents([...students, response.data.student]);
        setNewStudent({ name: '', registrationNumber: '', grade: '' });
        // Optionally, show a success message or perform other actions after successful addition
      } catch (error) {
        console.error('Error adding student:', error);
        setError('Error adding student');
      }
    } else {
      setError('Please fill out all fields');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5 ml-64">
        <h2 className="text-2xl mb-5">Students</h2>
        <form onSubmit={handleAddStudent} className="mb-5 flex">
          <input
            type="text"
            placeholder="Enter student name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="p-2 mr-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Enter registration number"
            value={newStudent.registrationNumber}
            onChange={(e) => setNewStudent({ ...newStudent, registrationNumber: e.target.value })}
            className="p-2 mr-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Enter grade"
            value={newStudent.grade}
            onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
            className="p-2 mr-3 border border-gray-300 rounded-md"
            required
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
            Add Student
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <ul className="list-none p-0">
          {students.map((student) => (
            <li key={student.id} className="bg-white rounded-lg p-5 mb-3 shadow-md">
              {student.name} - {student.registrationNumber} - {student.grade}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Students;
