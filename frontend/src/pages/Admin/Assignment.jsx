// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Assignments = () => {
//   const [newAssignment, setNewAssignment] = useState({ title: '', description: '', grade: '', deadline: '' });
//   const [assignments, setAssignments] = useState([]);

//   useEffect(() => {
//     fetchAssignments();
//   }, []);

//   const fetchAssignments = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/v1/assignments/getall');
//       setAssignments(response.data.assignments);
//     } catch (error) {
//       console.error('Error fetching assignments:', error);
//     }
//   };

//   const handleAddAssignment = async (e) => {
//     e.preventDefault();
//     if (newAssignment.title.trim() !== '' && newAssignment.description.trim() !== '' && newAssignment.grade.trim() !== '' && newAssignment.deadline.trim() !== '') {
//       try {
//         const response = await axios.post('http://localhost:4000/api/v1/assignments', newAssignment);
//         // Display success toast message
//         toast.success('Assignment added successfully');
//         // Add the new assignment to the list
//         setAssignments([...assignments, response.data.assignment]);
//         // Clear the form
//         setNewAssignment({ title: '', description: '', grade: '', deadline: '' });
//       } catch (error) {
//         console.error('Error adding assignment:', error);
//         // Display error toast message
//         toast.error('Error adding assignment');
//       }
//     }
//   };

//   return (
//     <div className="flex">
//       <ToastContainer />
//       <Sidebar />
//       <div className="flex-1">
//         <div className="p-5">
//           <h2 className="text-2xl mb-5">Assignments</h2>
//           <form onSubmit={handleAddAssignment} className="mb-5">
//             <input
//               type="text"
//               placeholder="Enter assignment title"
//               value={newAssignment.title}
//               onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
//               className="p-3 border border-gray-300 rounded-md mb-3 block w-full"
//             />
//             <textarea
//               placeholder="Enter assignment description"
//               value={newAssignment.description}
//               onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
//               className="p-3 border border-gray-300 rounded-md mb-3 block w-full resize-y"
//               rows="3"
//             />
//             <input
//               type="text"
//               placeholder="Enter assignment grade"
//               value={newAssignment.grade}
//               onChange={(e) => setNewAssignment({ ...newAssignment, grade: e.target.value })}
//               className="p-3 border border-gray-300 rounded-md mb-3 block w-full"
//             />
//             <input
//               type="text"
//               placeholder="Enter assignment deadline"
//               value={newAssignment.deadline}
//               onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
//               className="p-3 border border-gray-300 rounded-md mb-3 block w-full"
//             />
//             <button type="submit" className="p-3 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-200">Add Assignment</button>
//           </form>
//           <ul className="list-none p-0">
//             {assignments.map((assignment) => (
//               <li key={assignment.id} className="bg-white rounded-lg p-5 mb-3 shadow-md">
//                 <h3 className="text-lg font-semibold">{assignment.title}</h3>
//                 <p className="text-gray-700 mb-1">{assignment.description}</p>
//                 <p className="text-gray-600">{assignment.grade}, {assignment.deadline}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Assignments;


import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Assignments = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', grade: '', deadline: '' });
  const [assignments, setAssignments] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/assignments/getall');
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (newAssignment.title.trim() !== '' && newAssignment.description.trim() !== '' && newAssignment.grade.trim() !== '' && newAssignment.deadline.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:4000/api/v1/assignments', newAssignment);
        toast.success('Assignment added successfully');
        setAssignments([...assignments, response.data.assignment]);
        setNewAssignment({ title: '', description: '', grade: '', deadline: '' });
      } catch (error) {
        console.error('Error adding assignment:', error);
        toast.error('Error adding assignment');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ToastContainer />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-8 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <h1 className="text-3xl font-bold mb-8">Assignments</h1>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Add New Assignment</h2>
          <form onSubmit={handleAddAssignment}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue"
                placeholder="Enter assignment title"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={newAssignment.description}
                onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue"
                placeholder="Enter assignment description"
                rows={3}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="grade" className="block text-gray-700 font-bold mb-2">
                Grade
              </label>
              <input
                type="text"
                id="grade"
                value={newAssignment.grade}
                onChange={(e) => setNewAssignment({ ...newAssignment, grade: e.target.value })}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue"
                placeholder="Enter assignment grade"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="deadline" className="block text-gray-700 font-bold mb-2">
                Deadline
              </label>
              <input
                type="text"
                id="deadline"
                value={newAssignment.deadline}
                onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue"
                placeholder="Enter assignment deadline"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Add Assignment
            </button>
          </form>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Assignments</h2>
          <ul className="space-y-4">
            {assignments.map((assignment) => (
              <li key={assignment.id} className="border-b pb-4">
                <h3 className="text-xl font-bold">{assignment.title}</h3>
                <p className="text-gray-600 mb-2">{assignment.description}</p>
                <p className="text-gray-500">
                  {assignment.grade}, {assignment.deadline}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
