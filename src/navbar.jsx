import React from 'react';
import { Link } from 'react-router-dom'; 

const NavBar = () => {
  return (
    <div className="nav-bar justify-center items-center flex z-50  backdrop-blur-xl fixed w-screen bg-transparent">
      <div className='logo h-14 w-1/6 flex items-center '>
        <img src="/assets/logo.png" alt="Logo" className='h-20 w-auto mx-8 my-3' />
      </div>

      <div className="navbar flex justify-center items-center text-white bg-gray-700 w-4/6 h-14 backdrop-blur-sm rounded-4xl m-4 ">
        <ul className="justify-evenly flex min-w-full">
          <li className="bg-gray-700 transition ease-in-out scale-110 duration-300 hover:text-amber-200 m-1 px-3.5 py-1 rounded-2xl hover:cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="bg-gray-700 transition ease-in-out scale-110 duration-300 hover:text-amber-200 m-1 px-3.5 py-1 rounded-2xl hover:cursor-pointer">
            About Us
          </li>
          <li className="bg-gray-700 transition ease-in-out scale-110 duration-300 hover:text-amber-200 m-1 px-3.5 py-1 rounded-2xl hover:cursor-pointer">
            Contact Us
          </li>
          <li className="bg-gray-700 transition ease-in-out scale-110 duration-300 hover:text-amber-200 m-1 px-3.5 py-1 rounded-2xl hover:cursor-pointer">
            <Link to="/listing">List Properties</Link>
          </li>
        </ul>
      </div>

      <div className="profile h-14 w-1/6 flex items-center justify-end">
        <img src="/assets/profile.png" alt="Profile" className='h-15 w-auto mx-8 my-3' />
      </div>
    </div>
  );
};

export default NavBar;
