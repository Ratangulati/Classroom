import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FaTrash } from 'react-icons/fa';

const NoticeList = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [notices, setNotices] = useState([]);
  const { classId } = useParams();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchNotices();
  }, [classId]);

  const fetchNotices = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/notices/getall`, {
        params: { classId }
      });
      console.log('Notices response:', response.data);
      setNotices(response.data.notices);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const handleDeleteNotice = async (noticeId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/notices/${noticeId}`);
      console.log('Notice deleted:', response.data);
      fetchNotices();
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-bold mb-8">Notices</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <div key={notice._id} className="bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold">{notice.title}</h3>
                <button
                  onClick={() => handleDeleteNotice(notice._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Notice"
                >
                  <FaTrash />
                </button>
              </div>
              <p className="text-gray-600 mb-4">{notice.content}</p>
              <p className="text-gray-600 mb-4">Class: {notice.class && notice.class.class}</p>
              <p className="text-gray-500">
                Date: {format(new Date(notice.createdAt), 'MMMM d, yyyy hh:mm a')}
              </p>
              <Link
                to={`/teacher/notice-details/${notice._id}`}
                className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeList;
