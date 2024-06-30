import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';

const ProfileSection = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    fetchStudentDetails();
  }, [studentId]);

  const fetchStudentDetails = async () => {
    try {
      const studentResponse = await axios.get(`https://classroom-api-beta.vercel.app/students/${studentId}`);
      const studentData = studentResponse.data.student;
      setStudent(studentData);

      const allClassesResponse = await axios.get('https://classroom-api-beta.vercel.app/class/getall');
      const allClasses = allClassesResponse.data.classes;

      const filteredClasses = allClasses.filter(cls =>
        cls.students.some(std => std.registrationNumber === studentData.registrationNumber)
      );
      setClasses(filteredClasses);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching student details:', error);
      setError('Error fetching student details');
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">{error}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold mb-8">Student Profile</h1>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="flex items-center mb-6">
              <FaUserCircle className="text-4xl text-indigo-500 mr-4" />
              <h2 className="text-2xl font-bold">{student.name}</h2>
            </div>
            <div className="flex items-center mb-4">
              <p className="font-bold text-gray-700">Registration Number:</p>
              <p className="ml-2 text-gray-900">{student.registrationNumber}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="font-bold text-gray-700">Classes:</p>
              <p className="ml-2 text-gray-900">{classes.map(cls => cls.class).join(', ')}</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="font-bold text-gray-700">Password:</p>
              <p className="ml-2 text-gray-900">{student.password}</p>
            </div>
            {/* <div className="mb-5">
              <span className="font-bold text-gray-700">School:</span>
              <span className="ml-2 text-gray-900">{student.school}</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
