import React from 'react';

const InputField = ({ type, placeholder, value, onChange, name }) => {
  return (
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className="w-full p-2 my-2 border border-gray-300 rounded"
    />
  );
};

export default InputField;