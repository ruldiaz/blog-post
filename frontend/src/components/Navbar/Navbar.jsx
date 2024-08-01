import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Navbar.scss'; // Import the SCSS file
import { logout } from '../../redux/actions'; // Import the logout action

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, loggedIn } = useSelector((state) => state.auth);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">About</Link>
        </li>
        
        {loggedIn && (
          <li className="nav-item">
            <Link to="/create" className="nav-link">Create Post</Link>
          </li>
        )}

        {loggedIn ? (
          <>
            <li className="nav-item">
              {/* Display the user's name */}
              <span className="nav-link">Welcome, {user && user.username}!</span>
            </li>
            <li className="nav-item">
              {/* Logout button */}
              <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
