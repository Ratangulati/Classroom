import React from 'react';

const Title = ({ children }) => {
  return (
    <h1 className="text-4xl font-bold text-white md:text-2xl text-shadow-lg mt-5">
      {children}
    </h1>
  );
};

export default Title;
