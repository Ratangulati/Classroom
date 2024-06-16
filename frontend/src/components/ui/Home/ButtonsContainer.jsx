import React from 'react';

const ButtonsContainer = ({ children }) => {
  return (
    <div className="flex items-center space-x-2 mt-2 md:mt-0 md:mr-8 mr-0">
      {children}
    </div>
  );
};

export default ButtonsContainer;
