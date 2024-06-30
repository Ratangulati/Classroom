import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaSearch, FaUserPlus, FaUserGraduate, FaAngleRight } from 'react-icons/fa';

const Students = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/v1/students/getall`);
      setStudents(response.data.students);
      setFilteredStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to fetch students. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredList = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.registrationNumber.toLowerCase().includes(searchTerm) ||
      student.grade.toLowerCase().includes(searchTerm)
    );
    setFilteredStudents(filteredList);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Students</h1>
            <Link
              to="/admin/student/create"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 flex items-center"
            >
              <FaUserPlus className="mr-2" /> Create Student
            </Link>
          </div>
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p>{error}</p>
            </div>
          )}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Students List</h2>
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading students...</p>
                </div>
              ) : filteredStudents.length === 0 ? (
                <p className="text-gray-600 text-center py-4">No students found.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <li key={student._id} className="py-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaUserGraduate className="text-blue-500 mr-3 text-xl" />
                          <div>
                            <p className="text-lg font-semibold text-gray-800">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.registrationNumber}</p>
                          </div>
                        </div>
                        <Link
                          to={`/admin/students/${student._id}`}
                          className="flex items-center text-blue-600 hover:text-blue-900 transition duration-150 ease-in-out"
                        >
                          Details <FaAngleRight className="ml-1" />
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;