import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentSignIn = () => {
  const navigate = useNavigate();
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/api/v1/students/signin`, {
        registrationNumber,
        password,
      });

      if (response.data.success) {
        const { student } = response.data;
        localStorage.setItem('studentId', student._id);
        localStorage.setItem('studentName', student.name);

        navigate('/student/dashboard', { state: { name: student.name } });
      } else {
        setError('Invalid registration number or password');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setError('An error occurred while signing in. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Student Sign In</h2>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
              Registration Number
            </label>
            <input
              id="registrationNumber"
              name="registrationNumber"
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentSignIn;
