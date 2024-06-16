import React from 'react';
import { Link } from 'react-router-dom';

const AdminRegisterLink = ({ to, children }) => {
  return (
    <Link to={to} className="text-white text-xs font-bold no-underline mt-3 hover:underline md:text-sm">
      {children}
    </Link>
  );
};

export default AdminRegisterLink;
