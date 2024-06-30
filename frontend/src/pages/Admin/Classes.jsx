import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaChalkboardTeacher, FaPlus, FaAngleRight } from 'react-icons/fa';

const Classes = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://classroom-api-beta.vercel.app/class/getall');
      if (response.data && Array.isArray(response.data.classes)) {
        setClasses(response.data.classes);
      } else {
        setError("Invalid data received from server");
      }
    } catch (error) {
      console.error("Error fetching classes: ", error);
      setError("Failed to fetch classes. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Classes</h1>
            <Link
              to="/create-class" 
              className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center"
            >
              <FaPlus className="mr-2" /> Add Class
            </Link>
          </div>
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p>{error}</p>
            </div>
          )}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Current Classes</h2>
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading classes...</p>
                </div>
              ) : classes.length === 0 ? (
                <p className="text-gray-600 text-center py-4">No classes available.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {classes.map((classItem, index) => (
                    <li key={index} className="py-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaChalkboardTeacher className="text-indigo-500 mr-3 text-xl" />
                          <span className="text-lg text-gray-700">{classItem.class}</span>
                        </div>
                        <Link
                          to={`/class/${classItem._id}`}
                          className="flex items-center text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"
                        >
                          Details <FaAngleRight className="ml-1" />
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;