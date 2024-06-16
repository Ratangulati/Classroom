import React from 'react';

const AdminRegisterContainer = ({ children }) => {
  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-r from-pink-400 via-orange-300 to-green-200">
      {children}
    </div>
  );
};

export default AdminRegisterContainer;
