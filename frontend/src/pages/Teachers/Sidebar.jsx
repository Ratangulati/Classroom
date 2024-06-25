import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiAnnotation,
  HiArchive,
  HiOutlineCog,
} from 'react-icons/hi';

const TeacherSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const SidebarNavItem = ({ icon, to, text }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center p-3 transition-colors duration-200 pl-5 ${
          isActive
            ? 'bg-gray-700 text-white'
            : 'text-gray-300 hover:bg-gray-600 hover:text-white'
        }`}
      >
        <div className="text-xl">{icon}</div>
        {isOpen && <span className="ml-3 text-sm font-medium">{text}</span>}
      </Link>
    );
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white overflow-y-auto transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="flex justify-center items-center h-16 bg-gray-900">
        <img src="../assets/bg1.png" alt="Logo" className="h-8 w-auto" />
      </div>
      <nav className="mt-5">
        <SidebarNavItem icon={<HiOutlineChartBar />} to="/teacher/dashboard" text="Dashboard" />
        <SidebarNavItem icon={<HiOutlineUserGroup />} to="/teacher/classes" text="Classes" />
        <SidebarNavItem icon={<HiAnnotation />} to="/teacher/notices" text="Notices" />
        <SidebarNavItem icon={<HiArchive />} to="/teacher/assignments" text="Assignments" />
        <SidebarNavItem icon={<HiOutlineCog />} to="/teacher/profile" text="Profile" />
      </nav>
      <button
        className="absolute bottom-4 left-4 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition-colors duration-200"
        onClick={toggleSidebar}
      >
        <svg
          className={`w-6 h-6 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
};

export default TeacherSidebar;
