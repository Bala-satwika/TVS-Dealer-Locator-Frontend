

 import React, { useEffect, useState } from 'react';
import DealerDropdown from './DealerDropdown';
import { FaCalendarCheck } from 'react-icons/fa'; // Importing the FontAwesome icon
import Button from '@mui/material/Button'; // Import MUI Button

import './DealerDropdownWithTestRide.css'; 
import { fetchDealers,fetchStateName,fetchTestRideDetails } from '../../services/api';
import { FaHome, FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa'; // For icons
import TestRideList from './TestRideList';
const DealerDropdownWithTestRide = () => {
  const [dealers, setDealers] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState('');
  const [testride, setTestRide] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const [stateName, setStateName] = useState(''); // State for storing the state name
  const stateId = localStorage.getItem('stateId');
  const jwtToken = localStorage.getItem('jwtToken');

  // Fetch dealers based on stateId
  useEffect(() => {
    if (stateId) {
      fetchDealers(stateId, jwtToken)
        .then((data) => setDealers(data))
        .catch((error) => console.error(error));
    }
  }, [stateId, jwtToken]);

  // Fetch the state name based on the stateId
  useEffect(() => {
    if (stateId) {
      fetchStateName(stateId)
        .then((name) => setStateName(name))
        .catch((error) => console.error('Error fetching state name:', error));
    }
  }, [stateId]);

  const handleDealerChange = (e) => {
    const dealerId = e.target.value;
    setSelectedDealer(dealerId);

    if (dealerId) {
        fetchTestRideDetails(dealerId)
        .then((data) => setTestRide(data))
        .catch((error) => console.error(error));
    }
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('stateId');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className={darkTheme ? 'dashboard-container dark-theme' : 'dashboard-container'}>
      {/* Navbar */}
      <nav className="navbar">
        {/* Welcome Message */}
        <div className="welcome-message">
          <h3>View Testride Appointments - Dealers in {stateName || `State ${stateId}`}</h3> {/* Show state name or fallback to stateId */}
        </div>

        <ul className="navbar-menu">
          {/* Home Icon */}
          <li data-tooltip="Home">
            <FaHome />
          </li>

          {/* Theme Toggle Icon */}
          <li onClick={toggleTheme} data-tooltip={darkTheme ? 'Light Theme' : 'Dark Theme'}>
            {darkTheme ? <FaSun /> : <FaMoon />}
          </li>

          {/* Logout Icon */}
          <li onClick={handleLogout} data-tooltip="Logout">
            <FaSignOutAlt />
          </li>
        </ul>
      </nav>

      <div className="layout">
        {/* Left Panel: Dealer Dropdown and Orders */}
        <div>
          <h2>Select a Dealer</h2>
          <DealerDropdown
            dealers={dealers}
            selectedDealer={selectedDealer}
            onDealerChange={handleDealerChange}
          />
          {/* Test Ride Cards Section */}
          {selectedDealer && (
            <div >
              <h3>Test Ride Appointments</h3>
              {/* Passing the testride data to TestRideList component */}
              <TestRideList testride={testride} />
            </div>
          )}
        </div>

       
      </div>
    </div>
  );
};

export default 
 DealerDropdownWithTestRide;
