"use client";
import React, { use, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { signOut, useSession } from 'next-auth/react';


const Navbar = () => {

  const [userData, setUserData] = useState(null);
  const router = useRouter();
  // const { data: session } = useSession();

  //   console.log(email);
  useEffect(() => {
    // console.log('session : ',session.user.email);
    const email = localStorage.getItem('email') ;
    console.log(email);
    const loadUserProfile = async (email) => {
      console.log('email obtained from local storage');
      console.log(email);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      try {
        console.log('inside-loaduserprof-temp');
        console.log(email);
        const response = await axios.get(`/api/getUserData?email=${email}`);

        console.log('response fetched inside navbar');
        if (response.status === 200) {
          const data = response.data;
          console.log('data fetched');
          console.log(data);
          setUserData(data.userData);
          console.log(data.userData.designation);
          // if (data && data.length > 0) {
          //     setUserData(data[0]);
          // } else {
          //     console.error('No user data found');
          // }
        } else {
          console.error('Failed to fetch user data');
        }

      } catch (error) {
        console.error('Error while fetching user data:', error);
      }
    };

    loadUserProfile(email);

  }, []);

  const handleProfileClick = () => {
    router.push("profile"); // Use router.push to navigate to the profile page
   
  };

  const handleGoToHomePage = () => {
    router.push("authhome"); // Replace '/' with your home page URL

  };



  const handleLogout = async () => {
    localStorage.removeItem('email');
    signOut({ callbackUrl: 'http://localhost:3000/home' });
};



  return (
    <AppBar position="static">
      <Toolbar>
        {userData && (
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {userData.name}
          </Typography>
        )}

        <IconButton color="inherit" onClick={handleProfileClick}>
          <AccountCircleIcon />
        </IconButton>

{/* 
        <IconButton color="inherit">
          <LocationOnIcon />
        </IconButton> */}

        <IconButton color="inherit" onClick={handleGoToHomePage}>
          <HomeIcon />
        </IconButton>

        <IconButton color="inherit" onClick={handleLogout}>
          <ExitToAppIcon />
        </IconButton>

        {/* <Avatar alt="Your Avatar" src="/your-avatar.jpg" /> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
