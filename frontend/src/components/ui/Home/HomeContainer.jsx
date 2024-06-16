import React from 'react';
import { Link } from 'react-router-dom';

const HomeContainer = () => {
  return (
    <div className="flex flex-col items-center text-center bg-gradient-to-r from-[#6BD4E7] to-[#6FC3DF] bg-cover bg-center min-h-screen pt-20 md:pt-16">
      <div className="mt-5">
        <h1 className="text-4xl font-bold text-white md:text-2xl text-shadow-lg">Title</h1>
      </div>
      <div className="mt-5 w-4/5 max-h-screen object-cover">
        <img src="school_image.jpg" alt="School" className="w-full md:w-full" />
      </div>
      <div className="mt-5">
        <div className="max-w-2xl mx-auto text-lg text-white text-justify px-5 md:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</div>
      </div>
      <Link to="/admin-register" className="text-white text-xs font-bold no-underline mt-3 hover:underline md:text-sm">Admin Register</Link>
    </div>
  );
};

export default HomeContainer;
