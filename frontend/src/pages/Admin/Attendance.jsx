import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const Attendance = () => {
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
        <h1 className="text-3xl font-bold mb-8">Attendance</h1>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <ul className="space-y-4">
            {students.map((student, index) => (
              <li key={student.id} className="flex justify-between items-center border-b pb-4">
                <span className="text-lg">{student.name}</span>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={attendanceData[index]?.status === 'Present'}
                      onChange={() => handleStatusChange(student.id, 'Present')}
                    />
                    <span className="ml-2">Present</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-red-600"
                      checked={attendanceData[index]?.status === 'Absent'}
                      onChange={() => handleStatusChange(student.id, 'Absent')}
                    />
                    <span className="ml-2">Absent</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-yellow-600"
                      checked={attendanceData[index]?.status === 'Absent with apology'}
                      onChange={() => handleStatusChange(student.id, 'Absent with apology')}
                    />
                    <span className="ml-2">Absent with apology</span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;