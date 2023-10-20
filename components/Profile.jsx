"use client";
import React, { use, useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Paper } from '@mui/material';
const axios = require('axios');
import { styled } from '@mui/system';

// const TextField = withStyles(styles)(TextField);


const Profile = () => {
    const [userData, setUserData] = useState(null);
    //   console.log(email);
    useEffect(() => {
        const email = localStorage.getItem('email');
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
                <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        label="Name"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        color="secondary"
                        disabled
                    />
                    <TextField
                        label="Email"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        disabled

                    />
                    <TextField
                        label="Contact Number"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <TextField
                        label="Designation"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <TextField
                        label="Radio Details"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <TextField
                        label="Radio Set Details"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <TextField
                        label="Location"
                        variant="filled"
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    </Grid>
                    <Grid item xs={6}>
                    {userData && (
                        <div>
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
                                value={userData.location}
                                style={{color:'red'}}
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
