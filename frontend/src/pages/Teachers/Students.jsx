import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const StudentSection = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/students/getall');
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5 ml-64">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Students</h2>
          <ul className="divide-y divide-gray-200">
            {students.map((student) => (
              <li key={student.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                {student.name} - {student.registrationNumber} - {student.grade}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentSection;