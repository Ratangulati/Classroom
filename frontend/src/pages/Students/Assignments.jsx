import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const StudentAssignments = () => {
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

  const handleDoAssignment = (id) => {
    // Implement your logic for handling assignment submission
  };

  return (
    <div className="flex flex-col md:flex-row md:pl-[240px]">
      <div className="flex-shrink-0 w-full md:w-[250px]">
        <Sidebar />
      </div>
      <div className="flex-1 p-5">
        <h1 className="text-2xl mb-5">Assignments</h1>
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-lg shadow-md p-5 mb-5 max-w-[600px]">
            <h3 className="text-xl mb-2">{assignment.title}</h3>
            <p className="text-gray-700 mb-4">{assignment.description}</p>
            {!assignment.done ? (
              <AssignmentForm onDoAssignment={() => handleDoAssignment(assignment.id)} />
            ) : (
              <p className="text-green-600 font-bold">Assignment Done</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const AssignmentForm = ({ onDoAssignment }) => {
  const [opinion, setOpinion] = useState('');

  const handleInputChange = (event) => {
    setOpinion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (opinion.trim() !== '') {
      onDoAssignment();
    } else {
      alert("Please provide your opinion/assignment.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={opinion}
        onChange={handleInputChange}
        placeholder="Enter your opinion/assignment..."
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default StudentAssignments;
