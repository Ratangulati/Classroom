import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTeacher = () => {
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    subject: "",
    password: "", // Add password field
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (
      newTeacher.name.trim() === "" ||
      newTeacher.email.trim() === "" ||
      newTeacher.subject.trim() === "" ||
      newTeacher.password.trim() === "" // Check if password is filled
    ) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/teachers",
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

  return (
    <div className="bg-gray-100 shadow-xl rounded-lg p-8 mb-8 h-screen flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Teacher</h2>
        <form onSubmit={handleAddTeacher} className="mb-4 flex flex-col">
          <div className="mb-4">
            <label
              htmlFor="className"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
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
              className="block text-gray-700 font-bold mb-2 mt-2"
            >
              Email
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
              className="block text-gray-700 font-bold mb-2 mt-2"
            >
              Subject
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
              className="block text-gray-700 font-bold mb-2 mt-2"
            >
              Password
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
          <div className="flex justify-between">
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Teacher
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg ml-4 hover:bg-gray-300 transition duration-200"
            >
              Back
            </button>
          </div>
        </form>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AddTeacher;