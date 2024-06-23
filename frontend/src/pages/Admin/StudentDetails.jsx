import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const StudentDetails = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [classes, setClasses] = useState([]);
  const { studentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentDetails();
  }, [studentId]);

  const fetchStudentDetails = async () => {
    try {
      const studentResponse = await axios.get(`http://localhost:3000/api/v1/students/${studentId}`);
      setStudent(studentResponse.data.student);

      const allClassesResponse = await axios.get('http://localhost:3000/api/v1/class/getall');
      const allClasses = allClassesResponse.data.classes;

      const filteredClasses = allClasses.filter(cls =>
        cls.students.some(std => std.registrationNumber === studentResponse.data.student.registrationNumber)
      );

      setClasses(filteredClasses);
    } catch (error) {
      console.error('Error fetching student details:', error);
      setError('Error fetching student details');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/students/${studentId}`);
      navigate('/admin/students');
    } catch (error) {
      console.error('Error deleting student:', error);
      setError('Error deleting student');
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!student || !classes.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Student Details</h2>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Registration Number:</strong> {student.registrationNumber}</p>
          <p><strong>Class Name:</strong> {classes.map(cls => cls.class).join(', ')}</p>
          
          <div className=' mt-4'>
            <Link to="/admin/students" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mt-4 inline-block mr-4">
              Back to Students List
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

export default StudentDetails;
