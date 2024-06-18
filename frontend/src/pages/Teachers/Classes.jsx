// ClassSection.js (using Tailwind CSS)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const ClassSection = () => {
  const [classes, setClasses] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:000/api/v1/class/getall');
      if (response.data && Array.isArray(response.data.classes)) {
        setClasses(response.data.classes);
      } else {
        console.error('Error fetching classes: Invalid data format', response.data);
      }
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-2xl mb-5">Classes</h1>
        <ul className="list-none p-0">
          {classes.map((classItem, index) => (
            <li key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <h3 className="text-xl">{classItem.grade}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClassSection;
