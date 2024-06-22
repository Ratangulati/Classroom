import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddClass = () => {
  const [newClassName, setNewClassName] = useState('');
  const navigate = useNavigate();

  const handleAddClass = async (e) => {
    e.preventDefault();
    if (newClassName.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/class', { class: newClassName });
        navigate(-1); 
      } catch (error) {
        console.error('Error adding class:', error);
      }
    }
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="bg-gray-100 shadow-xl rounded-lg p-8 mb-8 h-screen flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Class</h2>
        <form onSubmit={handleAddClass}>
          <div className="mb-4">
            <label htmlFor="className" className="block text-gray-700 font-bold mb-2">
              Class Name
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
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Add Class
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg ml-4 hover:bg-gray-300 transition duration-200"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
