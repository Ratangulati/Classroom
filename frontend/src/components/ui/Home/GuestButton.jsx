import React from 'react';

const GuestButton = ({ children, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="text-white border-2 border-orange-500 py-2 px-4 cursor-pointer text-lg font-bold rounded-md bg-transparent hover:bg-orange-500 transition-all duration-300 md:py-2 md:px-4 md:text-base"
    >
      {children}
    </button>
  );
};

export default GuestButton;
