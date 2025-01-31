import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
  const navigate = useNavigate();
  const tvsLogo = "image.png"

  return (
    <AppBar position="static" style={{ background: '#333',backgroundColor:"#295F98" }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        
        {/* TVS Logo on the left */}
        <img 
          src={tvsLogo} 
          alt="TVS Logo" 
          style={{ width: '50px', height: '30px', cursor: 'pointer' }} 
          onClick={() => navigate('/')} // Clicking the logo also navigates to Home
        />

        {/* Buttons on the right */}
        <div>
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')} // Navigate to Home
          >
            Go to Home
          </Button>
          <Button
            color="inherit"
            startIcon={<LoginIcon />}
            onClick={() => navigate('/login')} // Navigate to Dealer Locator
          >
            B2B Login
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
