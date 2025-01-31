import React, { useEffect, useState } from 'react';
import DealerDropdown from './DealerDropdown';
import OrdersList from './OrdersList';
import OrdersChart from './OrdersChart';
import { Navigate, useNavigate } from 'react-router-dom';
import './Home.css'; 
import { FaCalendarCheck } from 'react-icons/fa'; // Importing the FontAwesome icon
import Button from '@mui/material/Button'; // Import MUI Button
import { fetchDealers,fetchStateName,fetchOrders } from '../../services/api';
import { FaHome, FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa'; // For icons

const Home = () => {
  const [dealers, setDealers] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState('');
  const [orders, setOrders] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const [stateName, setStateName] = useState(''); // State for storing the state name
  const stateId = localStorage.getItem('stateId');
  const jwtToken = localStorage.getItem('jwtToken');

  const navigate=useNavigate();

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
      fetchOrders(dealerId, jwtToken)
        .then((data) => setOrders(data))
        .catch((error) => console.error(error));
    }
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };


  const handleTestRide=()=>{
    navigate("/viewbookings");
  }
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
          <h3>Welcome to {stateName || `State ${stateId}`}</h3> {/* Show state name or fallback to stateId */}
        </div>

        <ul className="navbar-menu">
          {/* Home Icon */}
          <li onClick={handleTestRide}>
          <Button
        variant="contained"
        color="primary"
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, // Spacing between the icon and text
          
          fontSize: '16px',
          textTransform: 'none' // Prevents the text from being capitalized
        }}
      >
        <FaCalendarCheck size={20} style={{ marginRight: '8px' }} /> {/* Icon next to the text */}
        <span style={{ whiteSpace: 'nowrap' }}>Test Ride Appointments</span>
      </Button>
          </li>
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
        <div className="left-panel">
          <h2>Select a Dealer</h2>
          <DealerDropdown
            dealers={dealers}
            selectedDealer={selectedDealer}
            onDealerChange={handleDealerChange}
          />
          {selectedDealer && (
            <div className="orders-section">
              <h3>Orders</h3>
              <OrdersList orders={orders} />
            </div>
          )}
        </div>

        {/* Right Panel: Google Maps */}
        <div className="right-panel">
          <OrdersChart orders={orders} />  
        </div>
      </div>
    </div>
  );
};

export default Home;
