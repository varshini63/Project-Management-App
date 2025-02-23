// client/src/components/layout/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Project Manager
            </Link>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                <span className="text-white mr-4">{user?.name}</span>
                <button
                  onClick={logout}
                  className="text-white hover:text-gray-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:text-gray-200 px-3 py-2"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
