import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Announcement from './Announcement';
import Sidebar from './Sidebar';
import Performance from './Performance';
import EventCalendar from './EventCalender';

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [studentPerformance, setStudentPerformance] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchAnnouncements();
    fetchStudentPerformance();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/events/getall');
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const fetchStudentPerformance = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/performance/getall');
      setStudentPerformance(response.data.performance || []);
    } catch (error) {
      console.error('Error fetching student performance:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className={`flex-1 p-5 ml-64 transition-all ${isOpen ? 'ml-40' : 'ml-10'}`}>
        <div className="flex gap-5">
          <section className="mb-10 flex-1">
            <h2 className="text-2xl mb-5 text-gray-700">Overview</h2>
            <div className="flex gap-5">
              <div className="bg-white p-5 rounded-lg shadow-md transition-transform cursor-pointer flex-1 max-w-xs hover:translate-y-[-5px]">
                <h3 className="text-xl mb-3 text-blue-500">Total Students</h3>
                <p className="text-base text-gray-600">500</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md transition-transform cursor-pointer flex-1 max-w-xs hover:translate-y-[-5px]">
                <h3 className="text-xl mb-3 text-blue-500">Total Teachers</h3>
                <p className="text-base text-gray-600">50</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md transition-transform cursor-pointer flex-1 max-w-xs hover:translate-y-[-5px]">
                <h3 className="text-xl mb-3 text-blue-500">Total Classes</h3>
                <p className="text-base text-gray-600">50</p>
              </div>
            </div>
          </section>
          <section className="flex-1">
            <EventCalendar events={events} />
          </section>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-8">
          <Performance studentPerformance={studentPerformance} />
          <Announcement announcements={announcements} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import EventCalendar from './EventCalender';
// import Performance from './Performance';
// import Announcement from './Announcement';
// import Sidebar from './Sidebar';


// const AdminDashboard = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [events, setEvents] = useState([]);
//   const [announcements, setAnnouncements] = useState([]);
//   const [studentPerformance, setStudentPerformance] = useState([]);
//   const [totalStudents, setTotalStudents] = useState(0);
//   const [totalTeachers, setTotalTeachers] = useState(0);
//   const [totalClasses, setTotalClasses] = useState(0);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [eventsResponse, announcementsResponse, performanceResponse, studentsResponse, teachersResponse, classesResponse] = await Promise.all([
//         axios.get('http://localhost:4000/api/v1/events/getall'),
//         axios.get('http://localhost:4000/api/v1/announcements/getall'),
//         axios.get('http://localhost:4000/api/v1/performance/getall'),
//         axios.get('http://localhost:4000/api/v1/students/count'),
//         axios.get('http://localhost:4000/api/v1/teachers/count'),
//         axios.get('http://localhost:4000/api/v1/classes/count'),
//       ]);

//       setEvents(eventsResponse.data.events || []);
//       setAnnouncements(announcementsResponse.data.announcements || []);
//       setStudentPerformance(performanceResponse.data.performance || []);
//       setTotalStudents(studentsResponse.data.count || 0);
//       setTotalTeachers(teachersResponse.data.count || 0);
//       setTotalClasses(classesResponse.data.count || 0);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className={`flex-1 p-6 transition-all ${isOpen ? 'ml-64' : 'ml-20'}`}>
//         <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Overview</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold text-blue-600 mb-2">Total Students</h3>
//                 <p className="text-3xl font-bold text-gray-800">{totalStudents}</p>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold text-blue-600 mb-2">Total Teachers</h3>
//                 <p className="text-3xl font-bold text-gray-800">{totalTeachers}</p>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold text-blue-600 mb-2">Total Classes</h3>
//                 <p className="text-3xl font-bold text-gray-800">{totalClasses}</p>
//               </div>
//             </div>
//           </section>
//           <section>
//             <h2 className="text-2xl font-semibold mb-4">Event Calendar</h2>
//             <EventCalendar events={events} />
//           </section>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
//           <Performance studentPerformance={studentPerformance} />
//           <Announcement announcements={announcements} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;