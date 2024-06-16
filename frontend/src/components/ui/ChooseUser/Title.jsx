import React from 'react';

const Title = ({ children }) => {
  return (
    <h2 className="text-2xl font-bold mb-5 text-orange-500 md:text-xl">
      {children}
    </h2>
  );
};

export default Title;
