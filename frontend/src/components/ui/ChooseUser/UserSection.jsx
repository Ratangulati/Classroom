import React from 'react';

const UserSection = ({ children }) => {
  return (
    <div className="text-center pt-5 md:pt-0 md:m-5 md:text-left">
      {children}
    </div>
  );
};

export default UserSection;
