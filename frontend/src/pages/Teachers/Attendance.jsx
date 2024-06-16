// AttendanceSection.js (using Tailwind CSS)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const CheckAttendanceSection = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/students/getall');
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
      status: 'Present', // Default to 'Present'
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
      const response = await axios.post('http://localhost:4000/api/v1/attendance', { attendanceData: formattedData });
      console.log('Attendance data submitted:', response.data);
    } catch (error) {
      console.error('Error submitting attendance data:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5 ml-64">
        <div className="p-5">
          <h2 className="text-2xl mb-5">Attendance</h2>
          <ul className="list-none p-0">
            {students.map((student, index) => (
              <React.Fragment key={student.id}>
                <li className="flex items-center mb-4">
                  <span className="flex-1">{student.name}</span>
                  <label className="mr-4">
                    <input
                      type="checkbox"
                      checked={attendanceData[index]?.status === 'Present'}
                      onChange={() => handleStatusChange(student.id, 'Present')}
                      className="mr-2"
                    />
                    Present
                  </label>
                  <label className="mr-4">
                    <input
                      type="checkbox"
                      checked={attendanceData[index]?.status === 'Absent'}
                      onChange={() => handleStatusChange(student.id, 'Absent')}
                      className="mr-2"
                    />
                    Absent
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={attendanceData[index]?.status === 'Absent with apology'}
                      onChange={() => handleStatusChange(student.id, 'Absent with apology')}
                      className="mr-2"
                    />
                    Absent with apology
                  </label>
                </li>
                {index !== students.length - 1 && <hr className="mt-2 border-t border-gray-300" />}
              </React.Fragment>
            ))}
          </ul>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckAttendanceSection;
