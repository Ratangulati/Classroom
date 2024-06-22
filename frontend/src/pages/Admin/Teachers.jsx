import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const Teachers = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/teachers/getall');
      setTeachers(response.data.teachers);
      setFilteredTeachers(response.data.teachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setError('Error fetching teachers');
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredList = teachers.filter(teacher =>
      teacher.name.toLowerCase().includes(searchTerm) ||
      teacher.email.toLowerCase().includes(searchTerm) ||
      teacher.subject.toLowerCase().includes(searchTerm)
    );
    setFilteredTeachers(filteredList);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-bold mb-8">Teachers</h1>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search teachers..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border border-gray-300 rounded-md flex-1 mr-4"
          />
          <Link
            to="/class/:classId/add-teacher"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Teacher
          </Link>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Teachers List</h2>
          {filteredTeachers.length === 0 ? (
            <p>No teachers found.</p>
          ) : (
            <ul className="list-none p-0">
              {filteredTeachers.map((teacher) => (
                <li key={teacher._id} className="bg-white rounded-lg p-5 mb-3 shadow-md flex justify-between items-center">
                  <div >
                    <strong>{teacher.name}:</strong>  {teacher.subject}
                  </div>
                  <Link
                    to={`/admin/teachers/${teacher._id}`}
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

export default Teachers;
