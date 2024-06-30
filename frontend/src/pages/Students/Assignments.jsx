import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [student, setStudent] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setError('Student ID not found. Please log in again.');
      return;
    }

    setLoading(true);

    try {
      const studentResponse = await axios.get(`https://classroom-api-beta.vercel.app/students/${studentId}`);
      setStudent(studentResponse.data.student);

      const allClassesResponse = await axios.get('https://classroom-api-beta.vercel.app/class/getall');
      const allClasses = allClassesResponse.data.classes;

      const filteredClasses = allClasses.filter(cls =>
        cls.students.some(std => std.registrationNumber === studentResponse.data.student.registrationNumber)
      );

      setClasses(filteredClasses);

      const assignmentsResponses = await Promise.all(
        filteredClasses.map(cls => {
          return axios.get(`https://classroom-api-beta.vercel.app/assignments/class/${cls._id}`);
        })
      );

      const allAssignments = assignmentsResponses.flatMap(response => response.data.assignments);
      setAssignments(allAssignments);

      setError(null);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      setError('Error fetching assignments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDoAssignment = async (id, opinion) => {
    try {
      const response = await axios.post(`https://classroom-api-beta.vercel.app/assignments/${id}/submit`, {
        opinion,
        studentId: localStorage.getItem('studentId'),
      });
      if (response.data.success) {
        fetchAssignments(); 
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Assignments</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <p className="text-gray-500">Loading assignments...</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <div key={assignment._id} className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
                  <h3 className="text-2xl font-semibold text-blue-600 mb-4">{assignment.title}</h3>
                  <p className="text-gray-700 mb-4">{assignment.description}</p>
                  <p className="text-gray-600 mb-4">Class: {classes.map(cls => cls.class)}</p>
                  {!assignment.done ? (
                    <AssignmentForm onDoAssignment={(opinion) => handleDoAssignment(assignment._id, opinion)} />
                  ) : (
                    <p className="text-green-600 font-bold">Assignment Done</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No assignments found.</p>
            )}
          </div>
        )}
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
      setOpinion(''); 
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
        className="w-full mt-4 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
        Submit
      </button>
    </form>
  );
};

export default StudentAssignments;
