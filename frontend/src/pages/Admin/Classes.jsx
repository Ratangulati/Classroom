// import React from 'react';
// import Sidebar from './Sidebar';

// const Classes = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 ml-64 p-5"> 
//         <div>
//           <h2 className="text-2xl mb-5">Classes</h2>
//           <form className="mb-5 flex">
//             <input type="text" placeholder="Enter Class Name" className="p-2 mr-3 border border-gray-300 rounded-md" />
//             <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">Add Class</button>
//           </form>
//           <ul className="list-none p-0">
//             <li className="bg-white rounded-lg p-5 mb-3 shadow-md">Class Item Content</li>
//             {/* Add more ClassItem components as needed */}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Classes;


// Classes.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Classes = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-bold mb-8">Classes</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Add New Class</h2>
          <form className="mb-4">
            <div className="mb-6">
              <label htmlFor="className" className="block text-gray-700 font-bold mb-2">
                Class Name
              </label>
              <input
                type="text"
                id="className"
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue"
                placeholder="Enter class name"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Add Class
            </button>
          </form>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Classes</h2>
          <ul className="space-y-4">
            <li className="border-b pb-4">Class Item Content</li>
            {/* Add more ClassItem components as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Classes;
