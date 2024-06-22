import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const TeacherDetails = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [teacher, setTeacher] = useState(null);
  const [error, setError] = useState(null);
  const { teacherId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeacherDetails();
  }, [teacherId]);

  const fetchTeacherDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/teachers/${teacherId}`);
      setTeacher(response.data.teacher);
    } catch (error) {
      console.error('Error fetching teacher details:', error);
      setError('Error fetching teacher details');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/teachers/${teacherId}`);
      navigate('/admin/teachers');
    } catch (error) {
      console.error('Error deleting teacher:', error);
      setError('Error deleting teacher');
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Teacher Details</h2>
          <p><strong>Name:</strong> {teacher.name}</p>
          <p><strong>Email:</strong> {teacher.email}</p>
          <p><strong>Subject:</strong> {teacher.subject}</p>
          <div className="flex mt-4">
            <Link to="/admin/teachers" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 inline-block mr-4">
              Back to Teachers List
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
