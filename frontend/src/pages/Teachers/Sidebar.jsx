import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { BsGraphUp, BsPeople, BsPerson, BsFileText, BsBook, BsGraphDown, BsCalendar, BsGear, BsChatDots, BsCalendarEvent } from 'react-icons/bs';

const TeacherSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const SidebarNavItem = ({ icon, to, text, isOpen }) => {
    return (
      <li className="flex items-center p-3 border-b border-blue-800 hover:bg-blue-700 transition-colors duration-300">
        <div className="text-xl">{icon}</div>
        {isOpen && <Link to={to} className="ml-3 text-lg text-white no-underline">{text}</Link>}
      </li>
    );
  };  
   
  return (
    <div className={`fixed top-0 left-0 h-full bg-blue-800 text-white overflow-y-auto transition-width duration-300 ${isOpen ? 'w-72' : 'w-20'}`}>
      <div className="p-5">
        <img src="../assets/bg1.png" alt="Logo" className="w-12 h-auto mb-5" />
        <div className="text-center text-xl font-bold mb-5">Teacher</div>
        <ul className="list-none p-0">
        <SidebarNavItem icon={<BsGraphUp />} to="/teacher/dashboard" text="Dashboard" isOpen={isOpen} />
        <SidebarNavItem icon={<BsChatDots />} to="/teacher/announcement" text="Announcement" isOpen={isOpen} />
        <SidebarNavItem icon={<BsFileText />} to="/teacher/assignments" text="Assignments" isOpen={isOpen} />
        <SidebarNavItem icon={<BsCalendar />} to="/teacher/attendance" text="Attendance" isOpen={isOpen} />
        <SidebarNavItem icon={<BsGear />} to="/teacher/classes" text="Classes" isOpen={isOpen} />
        <SidebarNavItem icon={<BsGear />} to="/teacher/events" text="Events" isOpen={isOpen} />
        <SidebarNavItem icon={<BsBook />} to="/teacher/exams" text="Exams" isOpen={isOpen} />
        <SidebarNavItem icon={<BsGraphDown />} to="/teacher/performance" text="Performance" isOpen={isOpen} />
        <SidebarNavItem icon={<BsGear />} to="/teacher/profile" text="Profile" isOpen={isOpen} />
        <SidebarNavItem icon={<BsGear />} to="/teacher/students" text="Student" isOpen={isOpen} />
        <SidebarNavItem icon={<BsGear />} to="/teacher/teachers" text="Teachers" isOpen={isOpen} />
      </ul>
      </div>
      <div className="absolute top-5 right-0 w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 transform rotate-0" onClick={toggleSidebar}>
        <span className="text-white text-lg">{isOpen ? '▲' : '▼'}</span>
      </div>
    </div>
  );
};

export default TeacherSidebar;
