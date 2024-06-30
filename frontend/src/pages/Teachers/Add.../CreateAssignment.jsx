import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TeacherSidebar from '../Sidebar';

const CreateAssignment = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [assignment, setAssignment] = useState({
    title: '',
    description: '',
    deadline: ''
  });
  const [classDetails, setClassDetails] = useState(null);
  const { classId } = useParams();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (classId) {
      fetchClassDetails();
    }
  }, [classId]);

  const fetchClassDetails = async () => {
    try {
      if (!classId) {
        console.error('No class ID available');
        return;
      }
      const response = await axios.get(`https://classroom-api-beta.vercel.app/class/${classId}`);
      console.log('Class details response:', response.data);
      setClassDetails(response.data.class);
    } catch (error) {
      console.error('Error fetching class details:', error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    setAssignment({ ...assignment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://classroom-api-beta.vercel.app/assignments`, {
        ...assignment,
        classId
      });
      navigate(`/teacher/assignments`);
    } catch (error) {
      console.error('Error creating assignment:', error);
      alert('Failed to create assignment. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
        <h1 className="text-3xl font-bold mb-8">Create Assignment</h1>
        {classDetails ? (
          <h2 className="text-2xl font-semibold mb-4">Class: {classDetails.name || classDetails.class}</h2>
        ) : (
          <p>Loading class details...</p>
        )}
        <button
            onClick={() => navigate(`/teacher/classes`)}
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200 inline-block mb-6"
        >
            Back to Classes
        </button>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={assignment.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={assignment.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="deadline" className="block text-gray-700 font-bold mb-2">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={assignment.deadline}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Create Assignment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
