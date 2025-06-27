import React, { useContext, useEffect, useState } from 'react';
import { ModeContext } from '../DarkLightMode/ModeContext';
import { Link, NavLink } from 'react-router';
import './component.css';
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { FcBriefcase } from "react-icons/fc";
import { AuthContext } from '../Contexts/AuthContext';
import Loader from '../Loader/Loader';


const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(ModeContext);
  const { user, logout, loading } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#1a202c" : "white";
    document.body.style.color = darkMode ? "white" : "black";
  }, [darkMode]);


  const handleLogout = () => {
    logout()
      .then(() => {
        console.log("Logged out");
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div className={darkMode ? "bg-gray-900 text-white navbar sticky top-0 z-10" : "bg-slate-100/50 text-black navbar sticky top-0 z-10"}>
      <div className="navbar-start w-[170px] md:w-1/2">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3  w-52 shadow">
            {/* Home
Add Task (It will be a private/protected route)
Browse Tasks
My Posted Tasks (It will be a private/protected route)
Login/Signup
 */}
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li>
              <NavLink to={'/addtask'}>Add Task</NavLink>

            </li>
            <li><NavLink to={'/browse'}>Browse Tasks</NavLink></li>
            <li><NavLink to={'/mytasks'}>My Posted Tasks</NavLink></li>
            {user && (
  <li>
    <NavLink to="/dashboard">Dashboard</NavLink>
  </li>
)}

          </ul>
        </div>
        {/* logo */}
        <h2 className="btn color lg:flex hidden text-2xl btn-ghost "><FcBriefcase size={28} />SkillHunt</h2>


      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal  color">
          <li><NavLink to={'/'}>Home</NavLink></li>
          <li>
            <NavLink to={'/addtask'}>Add Task</NavLink>

          </li>
          <li><NavLink to={'/browse'}>Browse Tasks</NavLink></li>
          <li><NavLink to={'/mytasks'}>My Posted Tasks</NavLink></li>
          {user && (
  <li>
    <NavLink to="/dashboard">Dashboard</NavLink>
  </li>
)}


        </ul>
      </div>
{/* end */}
      <div className="navbar-end space-x-2">

        {loading && (
          <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}>
            <Loader></Loader>

          </div>
        )}

        {user && user.photoURL && (
          <div className="relative group">
            <div
              className="w-10 h-10 rounded-full border-2 border-blue-600 cursor-pointer"
              title={user.displayName}
              onClick={()=>setShow(!show)}
            >
              <img
                src={user.photoURL}
                alt="user"
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>
            {/* absolute right-0 mt-2 w-56 rounded-lg  shadow-lg p-4 z-50   opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 */}

            <div className={`absolute right-0 mt-2 w-56 rounded-lg  shadow-lg p-4 z-50   opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ${darkMode?"bg-gray-900 text-white" : "bg-white text-black"}`}>
              <p><strong>Name:</strong> {user.displayName}</p>
              <button
                onClick={handleLogout}
                className="mt-2 btn btn-sm bg-red-100 text-red-700"
              >
                Logout
              </button>
            </div>
            {/* test */}
            {show && (
              <div className="absolute bg-amber-700 right-0 mt-2 w-56 rounded-lg shadow-lg p-4 z-50  md:hidden transition-all duration-300">
              <p><strong>Name:</strong> {user.displayName}</p>
              <button
                onClick={handleLogout}
                className="mt-2 btn btn-sm bg-red-100 text-red-700"
              >
                Logout
              </button>
            </div>

            )}
            
          </div>
        )}



        {!user && (
          <>
            <Link to={'/signup'} className="btn w-[120px] bg-[#0c65e3]  text-white text-lg">Sign Up</Link>
            <Link to="/signin" className="btn bg-[#0c65e3] w-[120px] text-white text-lg">
              Sign In
            </Link></>
        )}

        <button onClick={toggleDarkMode} className={darkMode ? 'text-white  bg-black fill-amber-300 btn ' : ' bg-blue-100 btn text-black    '}>
          {darkMode ? <CiLight size={20} /> : <MdDarkMode size={20} />}
        </button>

        {/* sesh */}
      </div>
    </div>
  );
};

export default Navbar;