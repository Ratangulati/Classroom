import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const studentId = localStorage.getItem('studentId');

    if (!studentId) {
      console.error('studentId not found in localStorage');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/api/v1/assignments/getall', {
        params: { studentId }
      });
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleDoAssignment = async (id, opinion) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/assignments/${id}/submit`, {
        opinion,
        studentId: localStorage.getItem('studentId'),
      });
      if (response.data.success) {
        fetchAssignments(); // Refresh the assignments after successful submission
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Assignments</h1>
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">{assignment.title}</h3>
              <p className="text-gray-700 mb-4">{assignment.description}</p>
              {!assignment.done ? (
                <AssignmentForm onDoAssignment={(opinion) => handleDoAssignment(assignment.id, opinion)} />
              ) : (
                <p className="text-green-600 font-bold">Assignment Done</p>
              )}
            </div>
          ))}
        </div>
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
      onDoAssignment(opinion);
      setOpinion(''); // Clear the input field after submission
    } else {
      alert("Please provide your opinion/assignment.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={opinion}
        onChange={handleInputChange}
        placeholder="Enter your opinion/assignment..."
        className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default StudentAssignments;
