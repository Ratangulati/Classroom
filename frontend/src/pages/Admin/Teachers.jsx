import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const Teachers = () => {
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', subject: '' });
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/teachers/getall');
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setError('Error fetching teachers');
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (newTeacher.name.trim() !== '' && newTeacher.email.trim() !== '' && newTeacher.subject.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:4000/api/v1/teachers', newTeacher);
        const createdTeacher = response.data.teacher;
        setTeachers([...teachers, createdTeacher]);
        setNewTeacher({ name: '', email: '', subject: '' });
        // Optionally, show a success message or perform other actions after successful addition
      } catch (error) {
        console.error('Error adding teacher:', error);
        setError('Error adding teacher');
      }
    } else {
      setError('Please fill out all fields');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5 ml-64">
        <h2 className="text-2xl mb-5">Teachers</h2>
        <form onSubmit={handleAddTeacher} className="mb-5 flex">
          <input
            type="text"
            placeholder="Enter teacher name"
            value={newTeacher.name}
            onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
            className="p-2 mr-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Enter teacher email"
            value={newTeacher.email}
            onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
            className="p-2 mr-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Enter teacher subject"
            value={newTeacher.subject}
            onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
            className="p-2 mr-3 border border-gray-300 rounded-md"
            required
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
            Add Teacher
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <ul className="list-none p-0">
          {teachers.map((teacher) => (
            <li key={teacher.id} className="bg-white rounded-lg p-5 mb-3 shadow-md">
              {teacher.name} - {teacher.email} - {teacher.subject}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Teachers;
