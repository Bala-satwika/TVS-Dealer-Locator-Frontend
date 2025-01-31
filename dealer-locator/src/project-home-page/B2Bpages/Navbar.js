import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation(); // Get the current route

  // Define the links based on the current route
  const homeLink = location.pathname === '/adminpage' ? '/' : '/adminpage';
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('stateId');
    window.location.href = '/login'; // Redirect to login page
  };
  return (
    <nav id="navbar">
        <div id="logo-container">
        <img src="https://logos-world.net/wp-content/uploads/2022/12/TVS-Motor-Logo.png" alt="TVS Motors Logo" id="tvs-logo" />
      </div>
      <ul id="navbar-list">
        <li id="navbar-item">
          <Link to={homeLink} id="navbar-link">Home</Link>
        </li>
        <li id="navbar-item">
          <Link to="/logout" id="navbar-link" onClick={handleLogout}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
