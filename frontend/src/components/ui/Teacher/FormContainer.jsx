import React from 'react';

const FormContainer = ({ children, onSubmit }) => {
  return (
    <form 
      onSubmit={onSubmit}
      className="flex flex-col items-center w-4/5 max-w-sm p-5 border border-gray-300 rounded-lg bg-white shadow-md"
    >
      {children}
    </form>
  );
};

export default FormContainer;
