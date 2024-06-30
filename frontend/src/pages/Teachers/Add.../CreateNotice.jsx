import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TeacherSidebar from '../Sidebar';

const CreateNotice = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const { classId } = useParams();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchTeacherName = async () => {
      try {
        const teacherId = localStorage.getItem('teacherId');
        const response = await axios.get(`https://classroom-api-beta.vercel.app/teachers/${teacherId}`);
        if (response.data && response.data.teacher) {
          setTeacherName(response.data.teacher.name);
        }
      } catch (error) {
        console.error('Error fetching teacher name:', error);
      }
    };

    fetchTeacherName();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://classroom-api-beta.vercel.app/notices/${classId}`, {
        title,
        content,
      });
      navigate(`/teacher/notices`);
    } catch (error) {
      console.error('Error creating notice:', error);
      alert('Failed to create notice. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <TeacherSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
        <h1 className="text-3xl font-bold mb-8">Create Notice</h1>
        <button
            onClick={() => navigate(`/teacher/classes`)}
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200 inline-block mb-6"
        >
            Back to Classes
        </button>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Create Notice
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNotice;
