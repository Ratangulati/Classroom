import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Link, useNavigate } from 'react-router-dom';

const ClassSection = () => {
  const [classes, setClasses] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [teacherId, setTeacherId] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const storedTeacherId = localStorage.getItem('teacherId');
    if (storedTeacherId) {
      setTeacherId(storedTeacherId);
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
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-bold mb-8">Classes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <div key={classItem._id} className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-bold mb-4">{classItem.class}</h3>
              <div className="flex justify-between items-center">
                <Link
                  to={`/teacher/class/${classItem._id}`}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Details
                </Link>
                <button
                  onClick={() => handleAddAssignment(classItem._id)}
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Add Assignment
                </button>
                <button
                  onClick={() => handleAddNotice(classItem._id)}
                  className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-200"
                >
                  Add Notice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassSection;
