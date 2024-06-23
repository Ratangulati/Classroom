import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const TeacherProfileSection = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [teacher, setTeacher] = useState(null);
  const [error, setError] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const teacherId = localStorage.getItem('teacherId');

  useEffect(() => {
    fetchTeacherDetails();
  }, [teacherId]);

  const fetchTeacherDetails = async () => {
    try {
      const TeacherResponse = await axios.get(`http://localhost:3000/api/v1/teachers/${teacherId}`);
      setTeacher(TeacherResponse.data.teacher);

      const allClassesResponse = await axios.get(`http://localhost:3000/api/v1/teachers/${teacherId}/classes`);
      const allClasses = allClassesResponse.data.classes;

      const filteredClasses = allClasses.filter(cls =>
        cls.teachers.some(tch => tch.email === TeacherResponse.data.teacher.email)
      );

      setClasses(filteredClasses);
      console.log(filteredClasses)
      console.log(TeacherResponse.data.teacher)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching teacher details:', error);
      setError('Error fetching teacher details');
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
            <span className="ml-2 text-gray-900">{teacher.name}</span>
          </div>
          <div className="mb-5">
            <span className="font-bold text-gray-700">Classes:</span>
            <span className="ml-2 text-gray-900">{classes.map(cls => cls.class).join(', ')}</span>
          </div>
          <div className="mb-5">
            <span className="font-bold text-gray-700">Subjects:</span>
            <span className="ml-2 text-gray-900">{teacher.subject}</span>
          </div>
          <div className="mb-5">
            <span className="font-bold text-gray-700">email:</span>
            <span className="ml-2 text-gray-900">{teacher.email}</span>
          </div>
          <div className="mb-5">
            <span className="font-bold text-gray-700">Password:</span>
            <span className="ml-2 text-gray-900">{teacher.password}</span>
          </div>
          {/* <div className="mb-5">
            <span className="font-bold text-gray-700">School:</span>
            <span className="ml-2 text-gray-900">{teacher.school}</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileSection;
