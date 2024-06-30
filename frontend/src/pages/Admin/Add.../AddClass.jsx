import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { HiOutlineUserGroup } from 'react-icons/hi';
import Sidebar from '../Sidebar';


const AddClass = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [newClassName, setNewClassName] = useState('');
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleAddClass = async (e) => {
    e.preventDefault();
    if (newClassName.trim() !== '') {
      try {
        const response = await axios.post(`${apiUrl}/api/v1/class`, { class: newClassName });
        navigate(-1); 
      } catch (error) {
        console.error('Error adding class:', error);
      }
    }
  };

  const handleBack = () => {
    navigate(-1); 
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="bg-gray-100 shadow-xl rounded-lg p-8 mb-8 h-screen flex flex-col justify-center items-center">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Class</h2>
        <form onSubmit={handleAddClass}>
          <div className="mb-4">
            <label htmlFor="className" className="flex items-center block text-gray-700 font-bold mb-2">
                <HiOutlineUserGroup className="mr-2" /> Class Name
            </label>
            <input
              type="text"
              id="className"
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue border border-gray-300"
              placeholder="Enter class name"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
            >
              <FaPlus className="mr-2" /> Create Class
            </button>
            <button
                onClick={handleBack}
                className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                <FaArrowLeft className="mr-2" /> Back
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default AddClass;
