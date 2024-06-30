import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { HiEye, HiHashtag, HiOutlineBookOpen, HiOutlineEye, HiOutlineUser } from 'react-icons/hi';
import Sidebar from '../Sidebar';


const AddTeacher = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    subject: "",
    password: "", 
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (
      newTeacher.name.trim() === "" ||
      newTeacher.email.trim() === "" ||
      newTeacher.subject.trim() === "" ||
      newTeacher.password.trim() === "" 
    ) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/teachers`,
        newTeacher
      );
      navigate("/admin/teachers");
    } catch (error) {
      console.error("Error adding teacher:", error);
      setErrorMessage("Failed to add teacher. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/admin/teachers");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="bg-gray-100 shadow-xl rounded-lg p-8 mb-8 h-screen flex flex-col justify-center items-center">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Teacher</h2>
        <form onSubmit={handleAddTeacher} className="mb-4 flex flex-col">
          <div className="mb-4">
            <label
              htmlFor="className"
              className="flex items-center block text-gray-700 font-bold mb-2"
            >
              <HiOutlineUser className="mr-2" /> Name
            </label>
            <input
              type="text"
              placeholder="Enter teacher name"
              value={newTeacher.name}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue border border-gray-300"
              required
            />
            <label
              htmlFor="className"
              className="flex items-center block text-gray-700 font-bold mb-2 mt-3"
            >
              <HiHashtag className="mr-2" /> Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={newTeacher.email}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, email: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue border border-gray-300"
              required
            />
            <label
              htmlFor="className"
              className="flex items-center block text-gray-700 font-bold mb-2 mt-3"
            >
              <HiOutlineBookOpen className="mr-2" /> Subject
            </label>
            <input
              type="text"
              placeholder="Enter subject"
              value={newTeacher.subject}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, subject: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue border border-gray-300"
              required
            />
            <label
              htmlFor="className"
              className="flex items-center block text-gray-700 font-bold mb-2 mt-3"
            >
              <HiOutlineEye className="mr-2" /> Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={newTeacher.password}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, password: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue border border-gray-300"
              required
            />
          </div>
          <div className="flex justify-between gap-2">
            <button type="submit"  className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center">
              <FaPlus className="mr-2" /> Create Teacher
            </button>
            <button
                onClick={handleBack}
                className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                <FaArrowLeft className="mr-2" /> Back
              </button>
          </div>
        </form>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
      </div>
    </div>
  );
};

export default AddTeacher;