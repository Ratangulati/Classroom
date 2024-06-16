import React from 'react';
import { Link } from 'react-router-dom';

const SubmitButton = ({ to, children }) => {
  return (
    <Link 
      to={to}
      className="w-full py-3 mt-5 text-white bg-orange-500 rounded-lg text-lg font-bold text-center no-underline cursor-pointer hover:bg-orange-400 transition-colors duration-300 md:text-base"
    >
      {children}
    </Link>
  );
};

export default SubmitButton;

