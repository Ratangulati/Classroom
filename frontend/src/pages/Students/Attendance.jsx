import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Loader from '../../components/Loader';

const StudentAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const studentId = localStorage.getItem('studentId');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/attendance/student/${studentId}`);
        setAttendance(response.data.attendanceRecords);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        setErrorMessage("Error fetching attendance data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendance();
  }, [studentId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-5 text-gray-800">Attendance</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <ul className="list-none p-0">
          {attendance.length > 0 ? (
            attendance.map(({ _id, date, present }) => (
              <li key={_id} className="flex items-center justify-between p-4 mb-4 bg-white shadow rounded-lg">
                <span className="text-lg font-semibold">{new Date(date).toLocaleDateString()}</span>
                <span className={`text-lg font-semibold ${present ? 'text-green-500' : 'text-red-500'}`}>
                  {present ? 'Present' : 'Absent'}
                </span>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No attendance records found.</p>
          )}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
