import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Avatar from '@mui/material/Avatar';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Your Name
        </Typography>
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
        {/* <Button color="inherit">Profile</Button> */}
        <IconButton color="inherit">
          <LocationOnIcon />
        </IconButton>
      
        {/* <Avatar alt="Your Avatar" src="/your-avatar.jpg" /> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
