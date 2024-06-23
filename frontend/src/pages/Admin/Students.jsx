import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Students = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/students/getall');
      setStudents(response.data.students);
      setFilteredStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Error fetching students');
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
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-bold mb-8">Students</h1>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded-md flex-1 mr-4"
          />
          <Link
            to="/admin/student/create"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Create Student
          </Link>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Students List</h2>
          {filteredStudents.length === 0 ? (
            <p>No students found.</p>
          ) : (
            <ul className="list-none p-0">
              {filteredStudents.map((student) => (
                <li key={student._id} className="bg-white rounded-lg p-5 mb-3 shadow-md flex justify-between items-center">
                  <div>
                    <strong>{student.name}</strong>: {student.registrationNumber}
                  </div>
                  <Link
                    to={`/admin/students/${student._id}`}
                    className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-200 ml-4"
                  >
                    Details
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
