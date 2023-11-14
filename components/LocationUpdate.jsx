"use client";
import React, { use, useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Paper } from '@mui/material';
const axios = require('axios');
import { useSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

// const TextField = withStyles(styles)(TextField);


const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [latitude1, setLatitude1] = useState('');
    const [longitude1, setLongitude1] = useState('');
    const { data: session } = useSession();

    const findLocation = async (e) => {
        const email = localStorage.getItem('email');
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const { latitude, longitude } = position.coords;
            setLatitude1(latitude);
            setLongitude1(longitude);
            console.log('latitude :', latitude);
            console.log('longitude :', longitude);
            console.log('latitude1 :', latitude1);
            console.log('longitude1 :', longitude1);

            try {
                const res = await fetch("api/userlocation", {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      email,
                      latitude,
                      longitude,
                    }),
                  });

            } catch (error) {
                console.error('Error while fetching user data:', error);
            }
        };


    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: 20, marginTop: 40 }}>
            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                <Button variant="contained" color="primary" onClick={findLocation}>
                    Update Location
                </Button>
            </Box>
            {latitude1 && (
                <Typography variant="h5" gutterBottom>
                Current Location
                </Typography>
                 )}
                 {latitude1 && (
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
                 )}
            </Paper>
        </Container>
    );
};

export default Profile;
