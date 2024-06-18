// Home.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('./choose');
  };

  const handleSignUpClick = () => {
    navigate('./admin/register');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-white shadow-lg">
        <div className="flex items-center">
          <img
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Logo"
            className="h-10 mr-2"
          />
          <span className="text-2xl font-bold text-gray-800">Classroom</span>
        </div>
        <div>
          <button
            onClick={handleLoginClick}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </div>
      </nav>

      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Streamline School Management
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            Simplify operations, empower teachers, and drive student success
            with our intuitive platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleSignUpClick}
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-xl font-semibold shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginClick}
              className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full text-xl font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
            >
              Login
            </button>
          </div>
          <Link
            to="/request-demo"
            className="block mt-6 text-lg font-semibold text-blue-600 hover:underline"
          >
            Request a Demo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
