import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Sidebar from './Sidebar';

const Classes = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [newClassName, setNewClassName] = useState('')
  const [classes, setClasses] = useState([])

  useEffect(() => {
    fetchClasses()
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/class/getall');
      if (response.data && Array.isArray(response.data.classes)) {
        setClasses(response.data.classes);
      } else {
        console.log("Error while fetching classes: Invalid Data")
      }
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  }

  const handleAddClass = async (e) => {
    e.preventDefault();
    if (newClassName.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/class', { grade: newClassName });
        setClasses((prevClasses) => [...prevClasses, response.data.class]);
        setNewClassName('');
      } catch (error) {
        console.error('Error adding class:', error);
      }
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }; 

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-bold mb-8">Classes</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Add New Class</h2>
          <form onSubmit={handleAddClass} className="mb-4" >
            <div className="mb-6">
              <label htmlFor="className" className="block text-gray-700 font-bold mb-2">
                Class Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue"
                placeholder="Enter class name"
                value={newClassName}
                onChange={(e) => {
                  setNewClassName(e.target.value)
                }}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Add Class
            </button>
          </form>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Classes</h2>
          <ul className="space-y-4">
            {classes.map((classItem, index) => (
              <li key={index} className="border-b pb-4">
                {classItem.grade}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Classes;
