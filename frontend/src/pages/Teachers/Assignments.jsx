import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FaTrash } from 'react-icons/fa'; 

const Assignments = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const { classId } = useParams(); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchAssignments();
  }, [classId]);

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get(`http://localhost:3000/api/v1/assignments/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { classId }
      });
      console.log('Assignments response:', response.data);
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.delete(`http://localhost:3000/api/v1/assignments/${assignmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Assignment deleted:', response.data);
      fetchAssignments();
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-bold mb-8">Assignments</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <div key={assignment._id} className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold">{assignment.title}</h3>
                <button
                  onClick={() => handleDeleteAssignment(assignment._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Assignment"
                >
                  <FaTrash />
                </button>
              </div>
              <p className="text-gray-600 mb-4">{assignment.description}</p>
              <p className="text-gray-600 mb-4">Class: {assignment.class && assignment.class.class}</p>
              <p className="text-gray-500">
                Deadline: {format(new Date(assignment.deadline), 'MMMM d, yyyy')}
              </p>
              <Link
                to={`/teacher/assignment-submissions/${assignment._id}`}
                className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 inline-block"
              >
                View Submissions
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
