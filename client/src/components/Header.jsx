import React, { useState } from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <header className="shadow-md bg-slate-200">
      <div className="flex items-center justify-between max-w-6xl p-3 mx-auto">
        <Link to="/" onClick={closeSidebar}> {/* Close sidebar when navigating to home */}
          <h1 className="flex-wrap text-sm font-bold sm:text-xl">
            <span className="text-slate-500">HRS </span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        {/* Search bar */}
        <form className="flex items-center p-2 sm:p-3 rounded-lg bg-slate-100">
          <input
            type="text"
            placeholder="Search.."
            className="w-50 bg-transparent outline-none sm:w-84"
          />
          <FaSearch className="text-slate-600" />
        </form>

        {/* Toggle sidebar button for smaller screens */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <FaBars className="text-slate-600" />
        </button>

        {/* Sidebar for smaller screens */}
        {showSidebar && (
          <div className="sm:hidden absolute right-0 top-0 h-screen bg-white w-64">
            <button className="absolute top-2 right-2 text-slate-600" onClick={closeSidebar}>
              Close
            </button>
            <ul className="flex flex-col gap-4 p-4">
              <li className="text-slate-700 hover:underline">
                <Link to="/" onClick={closeSidebar}>Home</Link>
              </li>
              <li className="text-slate-700 hover:underline">
                <Link to="/about" onClick={closeSidebar}>About</Link>
              </li>
              <li className="text-slate-700 hover:underline">
                <Link to="/profile" onClick={closeSidebar}>
                  {currentUser ? (
                    <img
                      className="rounded-full h-7 w-7 object-cover"
                      src={currentUser.avatar}
                      alt="profile"
                    />
                  ) : (
                    'Sign in'
                  )}
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* Sidebar for larger screens */}
        <ul className="hidden sm:flex gap-4">
          <li className="text-slate-700 hover:underline">
            <Link to="/" onClick={closeSidebar}>Home</Link>
          </li>
          <li className="text-slate-700 hover:underline">
            <Link to="/about" onClick={closeSidebar}>About</Link>
          </li>
          <li>
            <Link to="/profile" onClick={closeSidebar}>
              {currentUser ? (
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                'Sign in'
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
