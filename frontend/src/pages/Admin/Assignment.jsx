import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Assignments = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', grade: '', deadline: '' });
  const [assignments, setAssignments] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/assignments/getall');
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (newAssignment.title.trim() !== '' && newAssignment.description.trim() !== '' && newAssignment.grade.trim() !== '' && newAssignment.deadline.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/assignments', newAssignment);
        toast.success('Assignment added successfully');
        setAssignments([...assignments, response.data.assignment]);
        setNewAssignment({ title: '', description: '', grade: '', deadline: '' });
      } catch (error) {
        console.error('Error adding assignment:', error);
        toast.error('Error adding assignment');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ToastContainer />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-bold mb-8">Assignments</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Add New Assignment</h2>
          <form onSubmit={handleAddAssignment}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue"
                placeholder="Enter assignment title"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={newAssignment.description}
                onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue"
                placeholder="Enter assignment description"
                rows={3}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="grade" className="block text-gray-700 font-bold mb-2">
                Grade
              </label>
              <input
                type="text"
                id="grade"
                value={newAssignment.grade}
                onChange={(e) => setNewAssignment({ ...newAssignment, grade: e.target.value })}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue"
                placeholder="Enter assignment grade"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="deadline" className="block text-gray-700 font-bold mb-2">
                Deadline
              </label>
              <input
                type="text"
                id="deadline"
                value={newAssignment.deadline}
                onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue"
                placeholder="Enter assignment deadline"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Add Assignment
            </button>
          </form>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Assignments</h2>
          <ul className="space-y-4">
            {assignments.map((assignment) => (
              <li key={assignment.id} className="border-b pb-4">
                <h3 className="text-xl font-bold">{assignment.title}</h3>
                <p className="text-gray-600 mb-2">{assignment.description}</p>
                <p className="text-gray-500">
                  {assignment.grade}, {assignment.deadline}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
