"use client";
import React, { use, useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Paper } from '@mui/material';
const axios = require('axios');
import { useSession } from 'next-auth/react';
import { styled } from '@mui/system';

// const TextField = withStyles(styles)(TextField);


const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [latitude1, setLatitude1] = useState('');
    const [longitude1, setLongitude1] = useState('');
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
            console.log('latitude :', latitude);
            console.log('longitude :', longitude);


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
            <Paper elevation={3} style={{ padding: 20, marginTop: 40 }}>
                <Typography variant="h5" gutterBottom>
                    User Profile
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                            variant="body1"
                            sx={{
                                backgroundColor: '#1e90ff',
                                color: 'white',
                                padding: '17px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                margin: '14.5px'
                            }}
                        >
                            Name
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                backgroundColor: '#1e90ff',
                                color: 'white',
                                padding: '17px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                margin: '11px'
                            }}
                        >
                            Email
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                backgroundColor: '#1e90ff',
                                color: 'white',
                                padding: '17px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                margin: '12px'
                            }}
                        >
                            Contact Number
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                backgroundColor: '#1e90ff',
                                color: 'white',
                                padding: '17px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                margin: '10px'
                            }}
                        >
                            Designation
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                backgroundColor: '#1e90ff',
                                color: 'white',
                                padding: '17px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                margin: '11px'
                            }}
                        >
                            Radio Details
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                backgroundColor: '#1e90ff',
                                color: 'white',
                                padding: '17px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                margin: '12px'
                            }}
                        >
                            Radio Set Details
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                backgroundColor: '#1e90ff',
                                color: 'white',
                                padding: '17px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                margin: '11px'
                            }}
                        >
                            Latitude
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                backgroundColor: '#1e90ff',
                                color: 'white',
                                padding: '17px',
                                borderRadius: '8px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                margin: '11px'
                            }}
                        >
                            Longitude
                        </Typography>

                    </Grid>
                    <Grid item xs={6}>
                        {userData && (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <TextField
                                    // label="Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={userData.name}

                                />
                                <TextField
                                    // label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={userData.email}
                                // disabled
                                />
                                <TextField
                                    // label="Contact Number"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={userData.contactNumber}
                                // disabled
                                />
                                <TextField
                                    // label="Designation"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={userData.designation}
                                // disabled
                                />
                                <TextField
                                    // label="Radio Details"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={userData.radioDetails}
                                // disabled
                                />
                                <TextField
                                    // label="Radio Set Details"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={userData.radioSetDetails}
                                // disabled
                                />
                                <TextField
                                    // label="Location"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={latitude1}
                                    style={{ color: 'red' }}
                                // disabled
                                />
                                <TextField
                                    // label="Location"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={longitude1}
                                    style={{ color: 'red' }}
                                // disabled
                                />
                            </div>
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Profile;
