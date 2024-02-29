import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-cover bg-center h-[410px] sm:h-[500px]" style={{ backgroundImage: `url('../../city2.jpg')` }}>
      <div className='flex flex-col gap-6 mt-0 px-3 max-w-5xl mx-auto '>
        <h1 className='text-slate-700 font-bold mt-[60px] sm:mt-[80px] text-3xl lg:text-6xl'>
          Find your ideal <span className='text-slate-500'>home </span>at
          <br />
          <span className='text-slate-500'>HRS</span> Estate
        </h1>
        <div className='text-gray-500 text-xs sm:text-sm'>
        Welcome to HRS Estate, your destination for finding your dream home. 
          <br />
         Explore our diverse range of properties and discover your perfect place to live today!
        </div>
        <div className="text-center flex ">
          <Link
            to={'/search'}
            className='inline-block px-4 py-4 bg-red-200 text-slate-700 font-bold rounded-md hover:bg-red-300'
          >
            Let's get started...
          </Link>
        </div>
      </div>
      
      <div className="flex mt-[50px] max-w-5xl mx-auto">
        <input 
          type="text" 
          placeholder="Search..." 
          className="flex-1 px-3 py-3 ml-2  sm:py-4 border border-gray-300 rounded-l-md shadow-md focus:outline-none  text-sm sm:text-base border-r-0" 
        />
        <button 
          className="flex items-center border-l-0 mr-2 justify-center px-4 sm:px-11  bg-slate-300 text-slate-700 rounded-r-md shadow-md hover:bg-slate-400 focus:outline-none  text-sm sm:text-base"
        >
          <FaSearch className="text-slate-700" />
          <span className="ml-2">Search</span>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
