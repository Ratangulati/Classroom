import React from 'react';

const SubmitButton = ({ children, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="w-full py-3 mt-5 text-white bg-orange-500 rounded-lg text-lg font-bold cursor-pointer hover:bg-orange-400 transition-colors duration-300 md:text-base"
    >
      {children}
    </button>
  );
};

export default SubmitButton;
