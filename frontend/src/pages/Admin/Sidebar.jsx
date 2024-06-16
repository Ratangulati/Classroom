import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsGraphUp, BsPeople, BsPerson, BsFileText, BsBook, BsGraphDown, BsCalendar, BsGear, BsChatDots, BsCalendarEvent } from 'react-icons/bs';

const Sidebar = () => {
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
    <div className={`fixed top-0 left-0 h-screen bg-blue-900 text-white pt-16 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex justify-center items-center mb-5">
        <img src="../assets/bg1.png" alt="Logo" className="w-12 h-auto" />
      </div>
      <ul className="list-none p-0">
        <SidebarNavItem icon={<BsGraphUp />} to="/admin/dashboard" text="Dashboard" isOpen={isOpen} />
        <SidebarNavItem icon={<BsPeople />} to="/admin/classes" text="Classes" isOpen={isOpen} />
        <SidebarNavItem icon={<BsPeople />} to="/admin/students" text="Students" isOpen={isOpen} />
        <SidebarNavItem icon={<BsPerson />} to="/admin/teachers" text="Teachers" isOpen={isOpen} />
        <SidebarNavItem icon={<BsFileText />} to="/admin/assignments" text="Assignments" isOpen={isOpen} />
        <SidebarNavItem icon={<BsBook />} to="/admin/exams" text="Exams" isOpen={isOpen} />
        <SidebarNavItem icon={<BsGraphDown />} to="/admin/performance" text="Performance" isOpen={isOpen} />
        <SidebarNavItem icon={<BsCalendar />} to="/admin/attendance" text="Attendance" isOpen={isOpen} />
        <SidebarNavItem icon={<BsBook />} to="/admin/library" text="Library" isOpen={isOpen} />
        <SidebarNavItem icon={<BsChatDots />} to="/admin/announcement" text="Announcement" isOpen={isOpen} />
        <SidebarNavItem icon={<BsCalendarEvent />} to="/admin/events" text="Events & Calendar" isOpen={isOpen} />
        <SidebarNavItem icon={<BsGear />} to="/admin/settings" text="Settings & Profile" isOpen={isOpen} />
      </ul>
      <div className="absolute top-4 right-4 cursor-pointer bg-gray-700 text-white rounded-full p-2" onClick={toggleSidebar}>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▲</span>
      </div>
    </div>
  );
};

export default Sidebar;
