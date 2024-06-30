import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddSubject = () => {
  const { classId } = useParams();
  const [newSubject, setNewSubject] = useState({ name: '', teacher: '' });
  const [teachers, setTeachers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('https://classroom-api-beta.vercel.app/teachers/getall');
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setErrorMessage('Failed to fetch teachers. Please try again later.');
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    if (newSubject.name.trim() === '' || newSubject.teacher.trim() === '') {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.post(
        `https://classroom-api-beta.vercel.app/class/${classId}/subjects`,
        {
          name: newSubject.name,
          teacherId: newSubject.teacher,
        }
      );
      navigate(`/class/${classId}`);
    } catch (error) {
      console.error('Error adding subject:', error);
      setErrorMessage('Failed to add subject. Please try again.');
    }
  };

  const handleBack = () => {
    navigate(`/class/${classId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Subject</h2>
        <form onSubmit={handleAddSubject} className="mb-4">
          <div className="mb-4">
            <label htmlFor="subjectName" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="subjectName"
              placeholder="Enter subject name"
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue border border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subjectTeacher" className="block text-gray-700 font-bold mb-2">
              Teacher
            </label>
            <select
              id="subjectTeacher"
              value={newSubject.teacher}
              onChange={(e) => setNewSubject({ ...newSubject, teacher: e.target.value })}
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue border border-gray-300"
              required
            >
              <option value="">Select teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Subject
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

export default AddSubject;
