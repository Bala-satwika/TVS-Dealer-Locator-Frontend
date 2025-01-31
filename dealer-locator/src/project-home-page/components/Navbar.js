import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#fff', color: '#333' }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography 
  variant="h6" 
  component="div" 
  sx={{ flexGrow: 0, marginRight: 'auto' }} // Stops it from growing and pushes it to the right
>
    <a href="https://www.tvsmotor.com/en/ly">
        <img 
            src="https://www.tvsmotor.com/-/media/Feature/Header/TVSLogo-hr.svg?la=en&hash=034409D6FBB73C2421FCC22BC6A52B58" 
            alt="TVS Motor Logo" 
            style={{ height: '60px',width: '100px', paddingRight: '20px' }} // Reduced the size and added some right padding
        />
    </a>
</Typography>

                <Button color="inherit" href="#">Home</Button>
                <Button color="inherit" onClick={handleMenuClick}>About Us</Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} component="a" href="https://www.tvsmotor.com/en/ly/about-us/overview">Overview</MenuItem>
                    <MenuItem onClick={handleClose} component="a" href="https://www.tvsmotor.com/en/ly/about-us/company-vision">Company Vision</MenuItem>
                    <MenuItem onClick={handleClose} component="a" href="https://www.tvsmotor.com/en/ly/about-us/sst">SST</MenuItem>
                    <MenuItem onClick={handleClose} component="a" href="https://www.tvsmotor.com/en/ly/about-us/board-of-directors">Board Of Directors</MenuItem>
                    <MenuItem onClick={handleClose} component="a" href="https://www.tvsmotor.com/en/ly/about-us/achievements">Achievements</MenuItem>
                </Menu>
                <Button color="inherit" href="#">Admin Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
