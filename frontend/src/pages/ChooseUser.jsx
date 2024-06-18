import React from 'react';
import { Link } from 'react-router-dom';

const ChooseUser = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-5 text-gray-800">Admin</h2>
        <Link to="/admin/signin" className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600">
          Login as Admin
        </Link>
      </div>
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-5 text-gray-800">Teacher</h2>
        <Link to="/teacher/signin" className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600">
          Login as Teacher
        </Link>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-5 text-gray-800">Student</h2>
        <Link to="/student/signin" className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600">
          Login as Student
        </Link>
      </div>
    </div>
  );
};

export default ChooseUser;