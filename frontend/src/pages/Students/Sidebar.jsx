import React, { useState } from 'react';
import { BsGraphUp, BsFileText, BsBook, BsGraphDown, BsCalendar, BsChatDots, BsGear, BsCalendarEvent } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const StudentSidebar = ({ isOpen, toggleSidebar }) => {
 
  const SidebarNavItem = ({ icon, to, text, isOpen }) => {
    return (
      <li className="flex items-center p-3 border-b border-blue-800 hover:bg-blue-700 transition-colors duration-300">
        <div className="text-xl">{icon}</div>
        {isOpen && <Link to={to} className="ml-3 text-lg text-white no-underline">{text}</Link>}
      </li>
    );
  };  

  return (
    <div className={`fixed top-0 left-0 h-full bg-[#2c3e50] text-white overflow-y-auto pt-16 transition-width duration-300 z-100 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex flex-col items-center py-5">
        <img src="../assets/bg1.png" alt="Logo" className="w-12 h-auto" />
        <h1 className={`mt-2 text-lg font-bold text-center ${!isOpen && 'hidden'}`}>Student</h1>
      </div>
      <ul className="list-none p-0">
        <SidebarNavItem icon={<BsGraphUp />} to="/student/dashboard" text="Dashboard" isOpen={isOpen} />
        <SidebarNavItem icon={<BsChatDots />} to="/student/announcement" text="Announcement" isOpen={isOpen} />
        <SidebarNavItem icon={<BsFileText />} to="/student/assignments" text="Assignments" isOpen={isOpen} />
        <SidebarNavItem icon={<BsCalendar />} to="/student/attendance" text="Attendance" isOpen={isOpen} />
        <SidebarNavItem icon={<BsBook />} to="/student/exams" text="Exams" isOpen={isOpen} />
        <SidebarNavItem icon={<BsBook />} to="/student/library" text="Library" isOpen={isOpen} />
        <SidebarNavItem icon={<BsGraphDown />} to="/student/performance" text="Performance" isOpen={isOpen} />
        <SidebarNavItem icon={<BsGear />} to="/student/profile" text="Profile" isOpen={isOpen} />
      </ul>
      <div onClick={toggleSidebar} className="absolute top-5 right-0 w-8 h-8 bg-[#34495e] rounded-full flex items-center justify-center cursor-pointer">
        <span className={`text-white text-xl transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▲</span>
      </div>
    </div>
  );
};

export default StudentSidebar;
