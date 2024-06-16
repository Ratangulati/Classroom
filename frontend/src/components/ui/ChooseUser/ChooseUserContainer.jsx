import React from 'react';

const ChooseUserContainer = ({ children }) => {
  return (
    <div className="flex flex-col justify-start items-center h-screen bg-yellow-400 md:flex-row md:justify-between md:items-start">
      {children}
    </div>
  );
};

export default ChooseUserContainer;
