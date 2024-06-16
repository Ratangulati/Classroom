import React from 'react';

const LoginButton = ({ children, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="bg-orange-500 text-white border-none py-2 px-4 cursor-pointer text-lg font-bold md:py-2 md:px-4 md:text-base md:mr-2"
    >
      {children}
    </button>
  );
};

export default LoginButton;
