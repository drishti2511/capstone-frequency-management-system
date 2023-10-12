"use client";
import React, { use, useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("drishtiolf@gmail.com");
//   console.log(email);
  useEffect(() => {

     const loadUserProfile = async(email) => {
        console.log('load_profile');
        console.log(email);
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }; 
        try {
            console.log('inside-loaduserprof-temp');
            const response = await axios.get(`/api/getUserData?email=${email}`);
            console.log('response fetched');
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

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: 20, marginTop: 40 }}>
        <Typography variant="h5">User Profile</Typography>
        {userData && (
          <div>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userData.name}
              disabled
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userData.email}
              disabled
            />
            <TextField
              label="Contact Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userData.contactNumber}
              disabled
            />
            <TextField
              label="Designation"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userData.designation}
              disabled
            />
            <TextField
              label="Radio Details"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userData.radioDetails}
              disabled
            />
            <TextField
              label="Radio Set Details"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userData.radioSetDetails}
              disabled
            />
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userData.location}
              disabled
            />
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
