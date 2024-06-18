// AttendanceSection.js (using Tailwind CSS)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const CheckAttendanceSection = () => {
  const [isOpen, setIsOpen] = useState(true); 
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/students/getall');
      setStudents(response.data.students);
      initializeAttendanceData(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const initializeAttendanceData = (students) => {
    const initialAttendanceData = students.map((student) => ({
      id: student.id,
      name: student.name,
      status: 'Present', 
    }));
    setAttendanceData(initialAttendanceData);
  };

  const handleStatusChange = (id, status) => {
    const updatedData = attendanceData.map((student) => {
      if (student.id === id) {
        return { ...student, status };
      }
      return student;
    });
    setAttendanceData(updatedData);
  };

  const handleSubmit = async () => {
    try {
      // Send attendance data to the database
      const formattedData = attendanceData.map(({ id, name, status }) => ({ studentId: id, name, status }));
      const response = await axios.post('http://localhost:3000/api/v1/attendance', { attendanceData: formattedData });
      console.log('Attendance data submitted:', response.data);
    } catch (error) {
      console.error('Error submitting attendance data:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Main content area */}
        <h1 className="text-3xl font-bold mb-8">Attendance</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Manage Attendance</h2>
          <ul className="space-y-4">
            {students.map((student, index) => (
              <li key={student.id} className="border-b pb-4">
                <h3 className="text-xl font-bold">{student.name}</h3>
                <div className="flex items-center space-x-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={attendanceData[index]?.status === 'Present'}
                      onChange={() => handleStatusChange(student.id, 'Present')}
                      className="mr-2"
                    />
                    <span className="text-green-600 font-bold">Present</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={attendanceData[index]?.status === 'Absent'}
                      onChange={() => handleStatusChange(student.id, 'Absent')}
                      className="mr-2"
                    />
                    <span className="text-red-600 font-bold">Absent</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={attendanceData[index]?.status === 'Absent with apology'}
                      onChange={() => handleStatusChange(student.id, 'Absent with apology')}
                      className="mr-2"
                    />
                    <span className="text-yellow-600 font-bold">Absent with apology</span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-200 mt-4"
          >
            Submit Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckAttendanceSection;
