import React from 'react';

const NavigationLinks = ({ children }) => {
  return (
    <div className="flex items-center flex-col md:flex-row md:space-x-4 md:mt-0 mt-2">
      {children}
    </div>
  );
};

export default NavigationLinks;
