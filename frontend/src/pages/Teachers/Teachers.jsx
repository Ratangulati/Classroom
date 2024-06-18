import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const TeacherSection = () => {
  const [teachers, setTeachers] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/teachers/getall');
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Teachers</h2>
          <ul className="divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <li key={teacher.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                {teacher.name} - {teacher.email} - {teacher.subject}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherSection;
