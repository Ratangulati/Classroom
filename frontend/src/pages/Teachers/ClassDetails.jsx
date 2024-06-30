import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Loader from "../../components/Loader";

const TeacherClassDetails = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [classDetails, setClassDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("students");
  const [attendance, setAttendance] = useState({});
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const { classId } = useParams();
  const teacherId = localStorage.getItem('teacherId');

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const classResponse = await axios.get(
          `https://classroom-api-beta.vercel.app/teachers/${teacherId}/classes/${classId}`
        );
        setClassDetails(classResponse.data.class);
        // Initialize attendance state
        const initialAttendance = {};
        classResponse.data.class.students.forEach(student => {
          initialAttendance[student._id] = false;
        });
        setAttendance(initialAttendance);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setErrorMessage("Error fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassDetails();
  }, [classId, teacherId]);

  useEffect(() => {
    const fetchAttendanceHistory = async () => {
      try {
        const response = await axios.get(
          `https://classroom-api-beta.vercel.app/teachers/${teacherId}/classes/${classId}/all-attendance`
        );
        setAttendanceHistory(response.data.attendanceRecords);
      } catch (error) {
        console.error("Error fetching attendance history: ", error);
      }
    };

    if (activeTab === "attendance") {
      fetchAttendanceHistory();
    }
  }, [activeTab, classId, teacherId]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAttendanceChange = (studentId) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const submitAttendance = async () => {
    try {
      await axios.post(`https://classroom-api-beta.vercel.app/teachers/${teacherId}/classes/${classId}/attendance`, {
        date: attendanceDate,
        attendance: attendance
      });
      alert('Attendance submitted successfully!');
      // Refresh attendance history
      const response = await axios.get(
        `https://classroom-api-beta.vercel.app/teachers/${teacherId}/classes/${classId}/all-attendance`
      );
      setAttendanceHistory(response.data.attendanceRecords);
    } catch (error) {
      console.error("Error submitting attendance: ", error);
      setErrorMessage("Error submitting attendance.");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!classDetails) {
    return <div>Error fetching class details.</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-800">
              {classDetails.class}
            </h1>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200 shadow-md">
              Back
            </button>
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <div className="flex justify-between mb-8">
            <div>
              <p className="text-lg text-gray-700">
                Number of Subjects: {classDetails.subjects ? classDetails.subjects.length : 0}
              </p>
              <p className="text-lg text-gray-700">
                Number of Students: {classDetails.students ? classDetails.students.length : 0}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex border-b">
              <button
                className={`py-2 px-4 ${activeTab === "students" ? "border-b-2 border-indigo-500" : ""}`}
                onClick={() => setActiveTab("students")}>
                Students
              </button>
              <button
                className={`py-2 px-4 ${activeTab === "subjects" ? "border-b-2 border-indigo-500" : ""}`}
                onClick={() => setActiveTab("subjects")}>
                Subjects
              </button>
              <button
                className={`py-2 px-4 ${activeTab === "attendance" ? "border-b-2 border-indigo-500" : ""}`}
                onClick={() => setActiveTab("attendance")}>
                Attendance
              </button>
            </div>
          </div>
          {activeTab === "students" && (
            <div>
              <h2 className="text-3xl font-bold mb-4 text-indigo-800">
                Students:
              </h2>
              <ul className="divide-y divide-gray-300">
                {classDetails.students && classDetails.students.length > 0 ? (
                  classDetails.students.map((student) => (
                    <li
                      key={student._id}
                      className="py-4 flex items-center justify-between">
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">{student.name}</p>
                        <p className="text-base text-gray-600">
                          Registration Number: {student.registrationNumber}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-600">No students enrolled</p>
                )}
              </ul>
            </div>
          )}
          {activeTab === "subjects" && (
            <div>
              <h2 className="text-3xl font-bold mb-4 text-indigo-800">
                Subjects:
              </h2>
              <ul className="divide-y divide-gray-300">
                {classDetails.subjects && classDetails.subjects.length > 0 ? (
                  classDetails.subjects.map((subject) => (
                    <li
                      key={subject._id}
                      className="py-4 flex items-center justify-between">
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">{subject.name}</p>
                        <p className="text-base text-gray-600">
                          Teacher: {subject.teacher.name}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-600">No subjects enrolled</p>
                )}
              </ul>
            </div>
          )}
          {activeTab === "attendance" && (
            <div>
              <h2 className="text-3xl font-bold mb-4 text-indigo-800">
                Attendance:
              </h2>
              <div className="mb-4">
                <label htmlFor="attendanceDate" className="block text-sm font-medium text-gray-700">Date:</label>
                <input
                  type="date"
                  id="attendanceDate"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <ul className="divide-y divide-gray-300">
                {classDetails.students && classDetails.students.length > 0 ? (
                  classDetails.students.map((student) => (
                    <li
                      key={student._id}
                      className="py-4 flex items-center justify-between">
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">{student.name}</p>
                        <p className="text-base text-gray-600">
                          Registration Number: {student.registrationNumber}
                        </p>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-indigo-600"
                            checked={attendance[student._id]}
                            onChange={() => handleAttendanceChange(student._id)}
                          />
                          <span className="ml-2 text-gray-700">Present</span>
                        </label>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-600">No students enrolled</p>
                )}
              </ul>
              <button
                onClick={submitAttendance}
                className="mt-4 bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-200 shadow-md">
                Submit Attendance
              </button>
              
              <h3 className="text-2xl font-bold mt-8 mb-4 text-indigo-800">
                Attendance History:
              </h3>
              <ul className="divide-y divide-gray-300">
                {attendanceHistory.map((record) => (
                  <li key={record._id} className="py-4">
                    <p className="text-lg font-semibold">Date: {new Date(record.date).toLocaleDateString()}</p>
                    <ul className="ml-4">
                      {record.attendanceRecords.map((attendance) => (
                        <li key={attendance._id} className="flex justify-between items-center">
                          <span>{attendance.student.name}</span>
                          <span className={attendance.present ? "text-green-500" : "text-red-500"}>
                            {attendance.present ? "Present" : "Absent"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherClassDetails;