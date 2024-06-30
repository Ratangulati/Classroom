import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaEnvelope, FaBook, FaUserCircle, FaArrowLeft } from 'react-icons/fa';

const TeacherDetails = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [teacher, setTeacher] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchTeacherDetails();
  }, [teacherId]);

  const fetchTeacherDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/v1/teachers/${teacherId}`);
      setTeacher(response.data.teacher);
    } catch (error) {
      console.error('Error fetching teacher details:', error);
      setError('Error fetching teacher details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/api/v1/teachers/${teacherId}`);
      navigate('/admin/teachers');
    } catch (error) {
      console.error('Error deleting teacher:', error);
      setError('Error deleting teacher');
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/admin/teachers" className="text-indigo-600 hover:text-indigo-800 flex items-center">
              <FaArrowLeft className="mr-2" /> Back to Teachers
            </Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading teacher details...</p>
              </div>
            ) : error ? (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p>{error}</p>
              </div>
            ) : teacher ? (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl font-bold text-gray-800">Teacher Details</h1>
                  <div className='flex gap-2'>
                    <button
                      onClick={handleDelete}
                      className="flex items-center bg-red-200 text-red-500 px-4 py-2 rounded-lg hover:bg-red-300 transition duration-300">
                      Remove Teacher
                    </button>
                    {/* <Link
                      to={`/admin/teachers/edit/${id}`}
                      className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
                    >
                      Edit Teacher
                    </Link> */}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center mb-8">
                    <FaUserCircle className="text-4xl text-indigo-500 mr-4" />
                    <h2 className="text-2xl font-bold">{teacher.name}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <FaEnvelope className="text-indigo-500 mr-2" />
                      <p><strong>Email:</strong> {teacher.email}</p>
                    </div>
                    <div className="flex items-center">
                      <FaBook className="text-indigo-500 mr-2" />
                      <p><strong>Subject:</strong> {teacher.subject}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center py-12 text-gray-600">No teacher details available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;