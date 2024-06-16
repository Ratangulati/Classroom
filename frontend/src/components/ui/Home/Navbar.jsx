import React from 'react';

const Navbar = ({ children }) => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-5 bg-[#6BD4E7] text-black font-sans z-50">
      {children}
    </nav>
  );
};

export default Navbar;
