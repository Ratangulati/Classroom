// AssignmentsSection.js (using Tailwind CSS)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const TeacherAssignments = () => {
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', grade: '', deadline: '' });
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/assignments/getall');
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (newAssignment.title.trim() !== '' && newAssignment.description.trim() !== '' && newAssignment.grade.trim() !== '' && newAssignment.deadline.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:4000/api/v1/assignments', newAssignment);
        setAssignments([...assignments, response.data.assignment]);
        setNewAssignment({ title: '', description: '', grade: '', deadline: '' });
      } catch (error) {
        console.error('Error adding assignment:', error);
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5 ml-64">
        <div className="p-5">
          <h2 className="text-2xl mb-5">Assignments</h2>
          <form onSubmit={handleAddAssignment} className="mb-5">
            <input
              type="text"
              placeholder="Enter assignment title"
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
              className="block w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
            <textarea
              placeholder="Enter assignment description"
              value={newAssignment.description}
              onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
              className="block w-full p-2 border border-gray-300 rounded mb-2 resize-y"
              required
            ></textarea>
            <input
              type="text"
              placeholder="Enter assignment grade"
              value={newAssignment.grade}
              onChange={(e) => setNewAssignment({ ...newAssignment, grade: e.target.value })}
              className="block w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
            <input
              type="text"
              placeholder="Enter assignment deadline"
              value={newAssignment.deadline}
              onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
              className="block w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
            >
              Add Assignment
            </button>
          </form>
          <ul className="list-none p-0">
            {assignments.map((assignment) => (
              <li key={assignment.id} className="bg-gray-100 rounded-lg shadow-md p-4 mb-4">
                <strong>{assignment.title}: </strong>
                {assignment.description}, {assignment.grade}, {assignment.deadline}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignments;
