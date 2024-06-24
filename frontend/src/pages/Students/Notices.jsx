import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const StudentNoticeList = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [notices, setNotices] = useState([]);
  const [student, setStudent] = useState(null);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchStudentClassAndNotices();
  }, []);

  const fetchStudentClassAndNotices = async () => {
    const studentId = localStorage.getItem('studentId');
    console.log('Fetching class for student ID:', studentId);

    if (!studentId) {
      console.error('studentId not found in localStorage');
      setError('Student information not found. Please log in again.');
      return;
    }

    try {
      const studentResponse = await axios.get(`http://localhost:3000/api/v1/students/${studentId}`);
      setStudent(studentResponse.data.student);

      const classResponse = await axios.get('http://localhost:3000/api/v1/class/getall');
      const allClasses = classResponse.data.classes;

      const filteredClasses = allClasses.filter(cls =>
        cls.students.some(std => std._id === studentResponse.data.student._id)
      );
      console.log(filteredClasses)
      if (filteredClasses.length === 0) {
        setError('You are not assigned to any class.');
        return;
      }

      setClasses(filteredClasses);

      // Fetch notices for all the classes the student belongs to
      const noticesResponses = await Promise.all(
        filteredClasses.map(cls => {
          console.log(`Fetching notices for class ID: ${cls._id}`);
          return axios.get(`http://localhost:3000/api/v1/notices/student/${cls._id}`);
        })
      );

      const allNotices = noticesResponses.flatMap(response => response.data.notices);
      setNotices(allNotices);
    } catch (error) {
      console.error('Error fetching class or notices:', error.response?.data || error.message);
      setError('Error fetching notices. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-bold mb-8">Notices</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <div key={notice._id} className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold">{notice.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{notice.content}</p>
              <p className="text-gray-500">
                Date: {format(new Date(notice.createdAt), 'MMMM d, yyyy hh:mm a')}
              </p>
              <Link
                to={`/student/notice-details/${notice._id}`}
                className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentNoticeList;
