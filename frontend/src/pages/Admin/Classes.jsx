import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Classes = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/class/getall');
      if (response.data && Array.isArray(response.data.classes)) {
        setClasses(response.data.classes);
      } else {
        console.log("Error while fetching classes: Invalid Data");
      }
    } catch (error) {
      console.error("Error fetching classes: ", error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Classes</h1>
          <Link
            to="/create-class" 
            className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Class
          </Link>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Current Classes</h2>
          <ul className="space-y-4">
            {classes.map((classItem, index) => (
              <li key={index} className="border-b pb-4 flex justify-between items-center">
              <div>{classItem.class}</div>
              <Link
                to={`/class/${classItem._id}`}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Details
              </Link>
            </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Classes;

