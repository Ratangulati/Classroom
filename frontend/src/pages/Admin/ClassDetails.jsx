import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Loader from "../../components/Loader";
import { FaUserGraduate, FaBook, FaChalkboardTeacher, FaPlus, FaTrash, FaArrowLeft } from "react-icons/fa";

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
  const [isAdding, setIsAdding] = useState(false);
  const { classId } = useParams();
  const navigate = useNavigate();


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


  const handleDelete = async (itemId, type) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/class/${classId}/${type}/${itemId}`);
      setClassDetails((prevDetails) => ({
        ...prevDetails,
        [type]: prevDetails[type].filter((item) => item._id !== itemId),
      }));
    } catch (error) {
      console.error(`Error deleting ${type}: `, error);
      setErrorMessage(`Error deleting ${type}.`);
    }
  };

  const handleDeleteClass = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/class/${classId}`);
      navigate("/admin/classes");
    } catch (error) {
      console.error("Error deleting class:", error);
      setErrorMessage("Error deleting class.");
    }
  };

  const handleAdd = async (event, type) => {
    event.preventDefault();
    let data;
    let endpoint;

    switch (type) {
      case "students":
        data = { registrationNumber: newStudentId };
        endpoint = "students";
        break;
      case "teachers":
        data = { email: newTeacherId };
        endpoint = "teachers";
        break;
      case "subjects":
        data = { name: newSubject.name, teacherId: newSubject.teacher };
        endpoint = "subjects";
        break;
      default:
        return;
    }

    try {
      await axios.post(`http://localhost:3000/api/v1/class/${classId}/${endpoint}`, data);
      const response = await axios.get(`http://localhost:3000/api/v1/class/${classId}`);
      setClassDetails(response.data.class);
      setActiveTab(type);
      setIsAdding(false);
      if (type === "students") setNewStudentId("");
      if (type === "teachers") setNewTeacherId("");
      if (type === "subjects") setNewSubject({ name: "", teacher: "" });
    } catch (error) {
      console.error(`Error adding ${type}: `, error);
      setErrorMessage(`Error adding ${type}.`);
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

  const renderTabContent = () => {
    const items = classDetails[activeTab];
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-indigo-800 capitalize">{activeTab}</h2>
        {items && items.length > 0 ? (
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item._id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition duration-300">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {activeTab === "students" && `Registration: ${item.registrationNumber}`}
                    {activeTab === "teachers" && `Email: ${item.email}`}
                    {activeTab === "subjects" && `Teacher: ${item.teacher.name}`}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item._id, activeTab)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No {activeTab} found</p>
        )}
      </div>
    );
  };

  const renderAddForm = () => {
    switch (activeTab) {
      case "students":
        return (
          <form onSubmit={(e) => handleAdd(e, "students")} className="space-y-4">
            <input
              type="text"
              placeholder="Registration Number"
              value={newStudentId}
              onChange={(e) => setNewStudentId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
              >
                Add Student
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        );
      case "teachers":
        return (
          <form onSubmit={(e) => handleAdd(e, "teachers")} className="space-y-4">
            <input
              type="email"
              placeholder="Teacher Email"
              value={newTeacherId}
              onChange={(e) => setNewTeacherId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
              >
                Add Teacher
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        );
      case "subjects":
        return (
          <form onSubmit={(e) => handleAdd(e, "subjects")} className="space-y-4">
            <input
              type="text"
              placeholder="Subject Name"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
              required
            />
            <select
              value={newSubject.teacher}
              onChange={(e) => setNewSubject({ ...newSubject, teacher: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name} ({teacher.email})
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
              >
                Add Subject
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold text-indigo-800">{classDetails.class}</h1>
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteClass}
                  className="flex items-center bg-red-200 text-red-500 px-4 py-2 rounded-lg hover:bg-red-300 transition duration-300"
                >
                  <FaTrash className="mr-2" />Remove class
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                >
                  <FaArrowLeft className="mr-2" /> Back
                </button>
              </div>
            </div>
            {errorMessage && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                <p>{errorMessage}</p>
              </div>
            )}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <FaBook className="text-3xl text-blue-500 mx-auto mb-2" />
                <p className="text-lg font-semibold text-blue-800">{classDetails.subjects ? classDetails.subjects.length : 0}</p>
                <p className="text-sm text-blue-600">Subjects</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg text-center">
                <FaUserGraduate className="text-3xl text-green-500 mx-auto mb-2" />
                <p className="text-lg font-semibold text-green-800">{classDetails.students ? classDetails.students.length : 0}</p>
                <p className="text-sm text-green-600">Students</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg text-center">
                <FaChalkboardTeacher className="text-3xl text-purple-500 mx-auto mb-2" />
                <p className="text-lg font-semibold text-purple-800">{classDetails.teachers ? classDetails.teachers.length : 0}</p>
                <p className="text-sm text-purple-600">Teachers</p>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex border-b">
                {["students", "subjects", "teachers"].map((tab) => (
                  <button
                    key={tab}
                    className={`py-2 px-4 focus:outline-none ${
                      activeTab === tab
                        ? "border-b-2 border-indigo-500 text-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => {
                      setActiveTab(tab);
                      setIsAdding(false);
                    }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            {isAdding ? (
              renderAddForm()
            ) : (
              <>
                {renderTabContent()}
                <button
                  onClick={() => setIsAdding(true)}
                  className="mt-4 flex items-center bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                >
                  <FaPlus className="mr-2" /> Add {activeTab.slice(0, -1)}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;