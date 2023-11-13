"use client";
import React, { use, useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Paper, Box } from '@mui/material';
const axios = require('axios');
import { useSession } from 'next-auth/react';
import { styled } from '@mui/system';

// const TextField = withStyles(styles)(TextField);


const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [latitude1,setLatitude1] = useState('');
    const [longitude1,setLongitude1] = useState('');
    const { data: session } = useSession();
    useEffect(() => {
        const email = localStorage.getItem('email');
        // const email = session.user.email;
        const loadUserProfile = async (email) => {
            console.log('email obtained from local storage');
            console.log(email);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
              });
              const { latitude, longitude } = position.coords;
              setLatitude1(latitude);
              setLongitude1(longitude);
              console.log('latitude :',latitude);
              console.log('longitude :',longitude);
        

            try {
                console.log('inside-loaduserprof-temp');
                console.log(email);
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
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    {/* User Profile Information */}
                    <Paper elevation={3} style={{ padding: 20, marginTop: 40 }}>
                        {/* ... (existing profile information) */}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    {/* Profile Picture Box */}
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                        height="100%"
                        boxShadow={3}
                        p={2}
                    >
                        {/* Assuming userData has a profileImageUrl property */}
                        {userData && userData.profileImageUrl ? (
                            <img
                                src={userData.profileImageUrl}
                                alt="Profile"
                                style={{ width: '100%', height: 'auto', borderRadius: '50%' }}
                            />
                        ) : (
                            <Typography variant="body2">
                                No profile picture available
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile;
