// ClassSection.js (using Tailwind CSS)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const ClassSection = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/class/getall');
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
    <div className="flex">
      <div className="flex-0 w-64">
        <Sidebar />
      </div>
      <div className="flex-1 p-5 ml-64">
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
