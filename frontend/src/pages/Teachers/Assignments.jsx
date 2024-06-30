import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FaTrash } from 'react-icons/fa';

const apiUrl = import.meta.env.VITE_API_URL;

const Assignments = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const teacherId = localStorage.getItem('teacherId');
    if (!teacherId) {
      setError('Teacher information not found. Please log in again.');
      return;
    }

    try {
      const teacherResponse = await axios.get(`${apiUrl}/api/v1/teachers/${teacherId}`);
      setTeacher(teacherResponse.data.teacher);

      const allClassesResponse = await axios.get(`${apiUrl}/api/v1/teachers/${teacherId}/classes`);
      const allClasses = allClassesResponse.data.classes;

      const filteredClasses = allClasses.filter(cls =>
        cls.teachers.some(tch => tch.email === teacherResponse.data.teacher.email)
      );

      setClasses(filteredClasses);

      const assignmentsResponses = await Promise.all(
        filteredClasses.map(cls => {
          return axios.get(`${apiUrl}/api/v1/assignments/class/${cls._id}`);
        })
      );

      const allAssignments = assignmentsResponses.flatMap(response => response.data.assignments);
      setAssignments(allAssignments);
    } catch (error) {
      console.error('Error fetching assignments:', error.response?.data || error.message);
      setError('Error fetching assignments. Please try again later.');
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${apiUrl}/api/v1/assignments/${assignmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAssignments();
    } catch (error) {
      console.error('Error deleting assignment:', error.response?.data || error.message);
      setError('Error deleting assignment. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Assignments</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
              <p className="text-gray-600 mb-4">Class: {classes.map(cls => cls.class)}</p>
              <p className="text-gray-500">
                Deadline: {format(new Date(assignment.deadline), 'MMMM d, yyyy')}
              </p>
              <Link
                // to={`/teacher/assignment-submissions/${assignment._id}`}
                className="mt-4 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 inline-block"
              >
                View Submissions
              </Link>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
