import React from 'react';

const NavLink = ({ href, children }) => {
  return (
    <a href={href} className="text-black no-underline text-lg font-bold hover:underline md:mx-2 mx-1">
      {children}
    </a>
  );
};

export default NavLink;
