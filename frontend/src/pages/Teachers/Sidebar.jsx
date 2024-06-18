import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsGraphUp, BsPeople, BsPerson, BsFileText, BsBook, BsGraphDown, BsCalendar, BsGear, BsChatDots, BsCalendarEvent } from 'react-icons/bs';

const TeacherSidebar = ({ isOpen, toggleSidebar }) => {

  const SidebarNavItem = ({ icon, to, text }) => {
    return (
      <li className="flex items-center p-3 border-b border-grey-800 hover:bg-grey-700 transition-colors duration-300">
        <div className="text-xl">{icon}</div>
        {isOpen && <Link to={to} className="ml-3 text-lg text-white no-underline">{text}</Link>}
      </li>
    );
  };

  return (
      <div className={`fixed top-0 left-0 h-full bg-[#2c3e50] text-white overflow-y-auto pt-16 transition-width duration-300 z-100 ${isOpen ? 'w-64' : 'w-20'}`}>      <div className="p-5">
        <div className="flex justify-center items-center mb-5">
          <img src="../assets/bg1.png" alt="Logo" className="w-12 h-auto" />
          <div className="text-center text-xl font-bold mb-5">Teacher</div>
        </div>
        <ul className="list-none p-0">
          <SidebarNavItem icon={<BsGraphUp />} to="/teacher/dashboard" text="Dashboard" />
          <SidebarNavItem icon={<BsChatDots />} to="/teacher/announcement" text="Announcement" />
          <SidebarNavItem icon={<BsFileText />} to="/teacher/assignments" text="Assignments" />
          <SidebarNavItem icon={<BsCalendar />} to="/teacher/attendance" text="Attendance" />
          <SidebarNavItem icon={<BsGear />} to="/teacher/classes" text="Classes" />
          <SidebarNavItem icon={<BsGear />} to="/teacher/events" text="Events" />
          <SidebarNavItem icon={<BsBook />} to="/teacher/exams" text="Exams" />
          <SidebarNavItem icon={<BsGraphDown />} to="/teacher/performance" text="Performance" />
          <SidebarNavItem icon={<BsGear />} to="/teacher/profile" text="Profile" />
          <SidebarNavItem icon={<BsGear />} to="/teacher/students" text="Student" />
          <SidebarNavItem icon={<BsGear />} to="/teacher/teachers" text="Teachers" />
        </ul>
        <div
        className="absolute top-4 right-4 cursor-pointer bg-gray-700 text-white rounded-full p-2"
        onClick={toggleSidebar}
      >
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          ▲
        </span>
      </div>
    </div>
    </div>
  );
};

export default TeacherSidebar;
