import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaTrash, FaArrowLeft, FaUserCircle, FaEnvelope, FaBook } from "react-icons/fa";

const StudentDetails = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const { studentId } = useParams();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchStudentDetails();
  }, [studentId]);

  const fetchStudentDetails = async () => {
    setIsLoading(true);
    try {
      const studentResponse = await axios.get(
        `${apiUrl}/api/v1/students/${studentId}`
      );
      setStudent(studentResponse.data.student);

      const allClassesResponse = await axios.get(
        "${apiUrl}/api/v1/class/getall"
      );
      const allClasses = allClassesResponse.data.classes;

      const filteredClasses = allClasses.filter((cls) =>
        cls.students.some(
          (std) =>
            std.registrationNumber ===
            studentResponse.data.student.registrationNumber
        )
      );

      setClasses(filteredClasses);
    } catch (error) {
      console.error("Error fetching student details:", error);
      setError("Error fetching student details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/api/v1/students/${studentId}`);
      navigate("/admin/students");
    } catch (error) {
      console.error("Error deleting student:", error);
      setError("Error deleting student");
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 p-8 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-16"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              to="/admin/students"
              className="text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back to Students
            </Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading student details...</p>
              </div>
            ) : error ? (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p>{error}</p>
              </div>
            ) : student ? (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl font-bold text-gray-800">Student Details</h1>
                  <div className="flex gap-2">
                    <button
                      onClick={handleDelete}
                      className="flex items-center bg-red-200 text-red-500 px-4 py-2 rounded-lg hover:bg-red-300 transition duration-300"
                    >
                      <FaTrash className="mr-2" />Remove Student
                    </button>
                    {/* <Link
                      to={`/admin/students/edit/${studentId}`}
                      className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
                    >
                      Edit Student
                    </Link> */}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center mb-8">
                    <FaUserCircle className="text-4xl text-indigo-500 mr-4" />
                    <h2 className="text-2xl font-bold">{student.name}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <FaEnvelope className="text-indigo-500 mr-2" />
                      <p><strong>Registration Number:</strong> {student.registrationNumber}</p>
                    </div>
                    <div className="flex items-center">
                      <FaBook className="text-indigo-500 mr-2" />
                      <p><strong>Class Name:</strong> {classes.map(cls => cls.class).join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center py-12 text-gray-600">No student details available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
