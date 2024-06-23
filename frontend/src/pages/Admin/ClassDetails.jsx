import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Loader from "../../components/Loader";

const ClassDetails = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [classDetails, setClassDetails] = useState(null);
  const [newStudentId, setNewStudentId] = useState("");
  const [newTeacherId, setNewTeacherId] = useState("");
  const [newSubject, setNewSubject] = useState({ name: "", teacher: "" });
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("students");
  const { classId } = useParams();

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const [classResponse, teachersResponse] = await Promise.all([
          axios.get(`http://localhost:3000/api/v1/class/${classId}`),
          axios.get(`http://localhost:3000/api/v1/class/${classId}/teachers`)
        ]);
        
        setClassDetails(classResponse.data.class);
        setTeachers(teachersResponse.data.teachers);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setErrorMessage("Error fetching data.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchClassDetails();
  }, [classId]);
  
  
  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/class/${classId}/students/${studentId}`);
      setClassDetails((prevDetails) => ({
        ...prevDetails,
        students: prevDetails.students.filter((student) => student._id !== studentId),
      }));
    } catch (error) {
      console.error("Error deleting student: ", error);
      setErrorMessage("Error deleting student.");
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/class/${classId}/subjects/${subjectId}`);
      setClassDetails((prevDetails) => ({
        ...prevDetails,
        subjects: prevDetails.subjects.filter((subject) => subject._id !== subjectId),
      }));
    } catch (error) {
      console.error("Error deleting subject: ", error);
      setErrorMessage("Error deleting subject.");
    }
  };

  const handleDeleteTeacher = async (teacherId) => {
    if (!teacherId) {
      console.error("Invalid teacher ID");
      setErrorMessage("Invalid teacher ID.");
      return;
    }
  
    try {
      await axios.delete(`http://localhost:3000/api/v1/class/${classId}/teachers/${teacherId}`);
      setClassDetails((prevDetails) => ({
        ...prevDetails,
        teachers: prevDetails.teachers.filter((teacher) => teacher._id !== teacherId),
      }));
    } catch (error) {
      console.error("Error removing teacher: ", error);
      setErrorMessage("Error removing teacher.");
    }
  };

  const handleAddStudent = async (event) => {
    event.preventDefault();
  
    try {
      await axios.post(`http://localhost:3000/api/v1/class/${classId}/students`, {
        registrationNumber: newStudentId,
      });
      setNewStudentId("");
      const response = await axios.get(`http://localhost:3000/api/v1/class/${classId}`);
      setClassDetails(response.data.class);
      setActiveTab("students");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("A student with this registration number already exists.");
      } else {
        console.error("Error adding student: ", error);
        setErrorMessage("Error adding student.");
      }
    }
  };
  
  const handleAddTeacher = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`http://localhost:3000/api/v1/class/${classId}/teachers`, {
        email: newTeacherId,
      });
      setNewTeacherId("");
      const response = await axios.get(`http://localhost:3000/api/v1/class/${classId}`);
      setClassDetails(response.data.class);
      setActiveTab("teachers");
    } catch (error) {
      console.error("Error adding teacher: ", error);
      setErrorMessage("Error adding teacher.");
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    if (newSubject.name.trim() === '' || newSubject.teacher.trim() === '') {
      setErrorMessage('Please fill out all fields.');
      return;
    }
    try {
      await axios.post(`http://localhost:3000/api/v1/class/${classId}/subjects`, {
        name: newSubject.name,
        teacherId: newSubject.teacher,
      });
      setNewSubject({ name: "", teacherId: "" }); // Reset form
      const response = await axios.get(`http://localhost:3000/api/v1/class/${classId}`);
      setClassDetails(response.data.class);
      setActiveTab("subjects");
    } catch (error) {
      console.error('Error adding subject:', error);
      setErrorMessage('Failed to add subject. Please try again.');
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-800">{classDetails.class}</h1>
            <div className="flex">
              {activeTab === "students" && (
                <button
                  onClick={() => setActiveTab("add-student")}
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 mr-2 shadow-md"
                >
                  ADD STUDENT
                </button>
              )}
              {activeTab === "subjects" && (
                <button
                  onClick={() => setActiveTab("add-subject")}
                  className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-200 mr-2 shadow-md"
                >
                  ADD SUBJECT
                </button>
              )}
              {activeTab === "teachers" && (
                <button
                  onClick={() => setActiveTab("add-teacher")}
                  className="bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-200 mr-2 shadow-md"
                >
                  ADD TEACHER
                </button>
              )}
              <button
                onClick={() => window.history.back()}
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200 shadow-md"
              >
                Back
              </button>
            </div>
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <div className="flex justify-between mb-8">
            <div>
              <p className="text-lg text-gray-700">Number of Subjects: {classDetails.subjects ? classDetails.subjects.length : 0}</p>
              <p className="text-lg text-gray-700">Number of Students: {classDetails.students ? classDetails.students.length : 0}</p>
              <p className="text-lg text-gray-700">Number of Teachers: {classDetails.teachers ? classDetails.teachers.length : 0}</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex border-b">
              <button
                className={`py-2 px-4 ${activeTab === "students" ? "border-b-2 border-indigo-500" : ""}`}
                onClick={() => setActiveTab("students")}
              >
                Students
              </button>
              <button
                className={`py-2 px-4 ${activeTab === "subjects" ? "border-b-2 border-indigo-500" : ""}`}
                onClick={() => setActiveTab("subjects")}
              >
                Subjects
              </button>
              <button
                className={`py-2 px-4 ${activeTab === "teachers" ? "border-b-2 border-indigo-500" : ""}`}
                onClick={() => setActiveTab("teachers")}
                >
                  Teachers
                </button>
              </div>
            </div>
            {activeTab === "students" && (
              <div>
                <h2 className="text-3xl font-bold mb-4 text-indigo-800">Students:</h2>
                <ul className="divide-y divide-gray-300">
                  {classDetails.students && classDetails.students.length > 0 ? (
                    classDetails.students.map((student) => (
                      <li key={student._id} className="py-4 flex items-center justify-between">
                        <div className="flex flex-col">
                          <p className="text-lg font-semibold">{student.name}</p>
                          <p className="text-base text-gray-600">Registration Number: {student.registrationNumber}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteStudent(student._id)}
                          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200 shadow-md"
                        >
                          Delete
                        </button>
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
                <h2 className="text-3xl font-bold mb-4 text-indigo-800">Subjects:</h2>
                <ul className="divide-y divide-gray-300">
                  {classDetails.subjects && classDetails.subjects.length > 0 ? (
                    classDetails.subjects.map((subject) => (
                      <li key={subject._id} className="py-4 flex items-center justify-between">
                        <div className="flex flex-col">
                          <p className="text-lg font-semibold">{subject.name}</p>
                          <p className="text-base text-gray-600">Teacher: {subject.teacher.name}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteSubject(subject._id)}
                          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200 shadow-md"
                        >
                          Delete
                        </button>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-600">No subjects enrolled</p>
                  )}
                </ul>
              </div>
            )}
            {activeTab === "teachers" && (
              <div>
                <h2 className="text-3xl font-bold mb-4 text-indigo-800">Teachers:</h2>
                <ul className="divide-y divide-gray-300">
                  {classDetails.teachers && classDetails.teachers.length > 0 ? (
                    classDetails.teachers.map((teacher) => (
                      <li key={teacher._id} className="py-4 flex items-center justify-between">
                        <div className="flex flex-col">
                          <p className="text-lg font-semibold">{teacher.name}</p>
                          <p className="text-base text-gray-600">Email: {teacher.email}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteTeacher(teacher._id)}
                          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200 shadow-md"
                        >
                          Remove
                        </button>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-600">No teachers assigned</p>
                  )}
                </ul>
              </div>
            )}
            {activeTab === "add-student" && (
              <form onSubmit={handleAddStudent} className="mt-4">
                <input
                  type="text"
                  placeholder="Registration Number"
                  value={newStudentId}
                  onChange={(e) => setNewStudentId(e.target.value)}
                  className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-4 py-2 rounded-lg mr-2"
                  required
                />
                <button
                  type="submit"
                  className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-200 shadow-md mr-2"
                >
                  Add Student
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("students")}
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200 shadow-md"
                >
                  Cancel
                </button>
              </form>
            )}
            {activeTab === "add-subject" && (
              <form onSubmit={handleAddSubject} className="mt-4">
                <input
                  type="text"
                  placeholder="Subject Name"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-4 py-2 rounded-lg mr-2"
                  required
                />
                <select
                  value={newSubject.teacher}
                  onChange={(e) => setNewSubject({ ...newSubject, teacher: e.target.value })}
                  className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-4 py-2 rounded-lg mr-2"
                  required
                >
                  <option value="">Select a teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.name} ({teacher.email})
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-200 shadow-md mr-2"
                >
                  Add Subject
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("subjects")}
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200 shadow-md"
                >
                  Cancel
                </button>
              </form>
            )}
            {activeTab === "add-teacher" && (
              <form onSubmit={handleAddTeacher} className="mt-4">
                <input
                  type="email"
                  placeholder="Teacher Email"
                  value={newTeacherId}
                  onChange={(e) => setNewTeacherId(e.target.value)}
                  className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-4 py-2 rounded-lg mr-2"
                  required
                />
                <button
                  type="submit"
                  className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-200 shadow-md mr-2"
                >
                  Add Teacher
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("teachers")}
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200 shadow-md"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default ClassDetails;
  
