import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

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
      const studentResponse = await axios.get(`http://localhost:3000/api/v1/students/${studentId}`);
      setStudent(studentResponse.data.student);

      const allClassesResponse = await axios.get('http://localhost:3000/api/v1/class/getall');
      const allClasses = allClassesResponse.data.classes;

      const filteredClasses = allClasses.filter(cls =>
        cls.students.some(std => std.registrationNumber === studentResponse.data.student.registrationNumber)
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
        <h1 className="text-3xl font-semibold mb-8">Profile</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-5">
            <span className="font-bold text-gray-700">Name:</span>
            <span className="ml-2 text-gray-900">{student.name}</span>
          </div>
          <div className="mb-5">
            <span className="font-bold text-gray-700">Registration Number:</span>
            <span className="ml-2 text-gray-900">{student.registrationNumber}</span>
          </div>
          <div className="mb-5">
            <span className="font-bold text-gray-700">Class:</span>
            <span className="ml-2 text-gray-900">{classes.map(cls => cls.class).join(', ')}</span>
          </div>
          <div className="mb-5">
            <span className="font-bold text-gray-700">Password:</span>
            <span className="ml-2 text-gray-900">{student.password}</span>
          </div>
          {/* <div className="mb-5">
            <span className="font-bold text-gray-700">School:</span>
            <span className="ml-2 text-gray-900">{student.school}</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
