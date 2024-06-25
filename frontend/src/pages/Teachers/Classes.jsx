import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaPlus, FaAngleRight } from 'react-icons/fa';

const ClassSection = () => {
  const [classes, setClasses] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const storedTeacherId = localStorage.getItem('teacherId');
    if (storedTeacherId) {
      fetchClasses(storedTeacherId);
    }
  }, []);

  const fetchClasses = async (teacherId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/teachers/${teacherId}/classes`);
      if (response.data && Array.isArray(response.data.classes)) {
        setClasses(response.data.classes);
      } else {
        console.error('Error fetching classes: Invalid data format', response.data);
      }
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    }
  };

  const handleAddAssignment = (classId) => {
    navigate(`/teacher/create-assignment/${classId}`);
  };

  const handleAddNotice = (classId) => {
    navigate(`/teacher/create-notice/${classId}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Classes</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.length === 0 ? (
              <div className="bg-white shadow-lg rounded-lg p-6">
                <p className="text-lg font-semibold">No classes assigned.</p>
              </div>
            ) : (
              classes.map((classItem) => (
                <div key={classItem._id} className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <FaChalkboardTeacher className="text-indigo-500 mr-3 text-xl" />
                      <span className="text-lg text-gray-700">{classItem.class}</span>
                    </div>
                    <Link
                      to={`/teacher/class/${classItem._id}`}
                      className="flex items-center text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"
                    >
                      Details <FaAngleRight className="ml-1" />
                    </Link>
                  </div>
                  <div className="">
                    <button
                      onClick={() => handleAddAssignment(classItem._id)}
                      className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 flex items-center"
                    >
                      <FaPlus className="mr-2" /> Add Assignment
                    </button>
                    <button
                      onClick={() => handleAddNotice(classItem._id)}
                      className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-200 mt-2 flex items-center"
                    >
                      <FaPlus className="mr-2" /> Add Notice
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSection;
