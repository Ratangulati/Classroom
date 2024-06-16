import React from 'react';

const SchoolImage = ({ src, alt }) => {
  return (
    <img src={src} alt={alt} className="w-4/5 max-h-screen object-cover mt-5 md:w-full" />
  );
};

export default SchoolImage;
