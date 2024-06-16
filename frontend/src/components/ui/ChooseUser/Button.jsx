import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="bg-green-300 text-white border-none py-2 px-5 mt-2 no-underline cursor-pointer rounded-md transition-all duration-300 hover:bg-green-500 md:py-2 md:px-4 md:text-sm"
    >
      {children}
    </Link>
  );
};

export default Button;
