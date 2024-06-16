// // Announcement.js
// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Announcement = () => {
//   const [announcement, setAnnouncement] = useState('');
//   const [announcements, setAnnouncements] = useState([]);

//   const fetchAnnouncements = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
//       setAnnouncements(response.data.announcements);
//     } catch (error) {
//       console.error('Error fetching announcements:', error);
//     }
//   };

//   useEffect(() => {
//     fetchAnnouncements();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:4000/api/v1/announcements', {
//         announcement: announcement,
//       });
//       console.log('Announcement sent:', response.data);
//       toast.success('Announcement sent successfully');
//       setAnnouncement('');
//       fetchAnnouncements();
//     } catch (error) {
//       console.error('Error sending announcement:', error);
//       toast.error('Error sending announcement');
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <ToastContainer />
//       <Sidebar />
//       <div className="flex-1 p-8">
//         <h1 className="text-3xl font-bold mb-8">Announcement</h1>
//         <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-6">
//               <label htmlFor="announcement" className="block text-gray-700 font-bold mb-2">
//                 Announcement
//               </label>
//               <textarea
//                 id="announcement"
//                 value={announcement}
//                 onChange={(e) => setAnnouncement(e.target.value)}
//                 className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue"
//                 placeholder="Enter announcement"
//                 rows={4}
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-200"
//             >
//               Send Announcement
//             </button>
//           </form>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-8">
//           <h2 className="text-2xl font-bold mb-4">Announcements</h2>
//           <ul className="space-y-4">
//             {announcements.map((announcement) => (
//               <li key={announcement._id} className="border-b pb-4">
//                 <p className="text-lg">{announcement.announcement}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Announcement;



import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Announcement = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/announcements', {
        announcement: announcement,
      });
      console.log('Announcement sent:', response.data);
      toast.success('Announcement sent successfully');
      setAnnouncement('');
      fetchAnnouncements();
    } catch (error) {
      console.error('Error sending announcement:', error);
      toast.error('Error sending announcement');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ToastContainer />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-bold mb-8">Announcement</h1>
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="mb-3">
            <label htmlFor="announcement" className="block mb-1">
              Announcement:
              <textarea
                id="announcement"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                required
                rows={4}
                cols={50}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            Send Announcement
          </button>
        </form>
        <h2 className="text-lg mb-3">Announcements</h2>
        <ul className="divide-y divide-gray-200">
          {announcements.map((announcement) => (
            <li key={announcement._id} className="py-2">
              <p className="text-base">{announcement.announcement}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Announcement;
