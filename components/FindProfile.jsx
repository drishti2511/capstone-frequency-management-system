"use client";
import React, { use, useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Paper } from '@mui/material';
const axios = require('axios');
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';
import { styled } from '@mui/system';

// const TextField = withStyles(styles)(TextField);


const FindProfile = () => {
    const [userData, setUserData] = useState(null);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [email, setEmail] = useState('');


    const findProfile = async (e) => {
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

            } else {
                console.error('Failed to fetch user data');
            }

        } catch (error) {
            console.error('Error while fetching user data:', error);
        }

        try {
            console.log('inside-loaduserprof-temp');
            console.log(email);
            const response = await axios.get(`/api/userlocation?email=${email}`);

            console.log('response fetched :', response);
            if (response.status === 200) {
                const data = response.data;
                console.log('data fetched');
                console.log(data);
                setLatitude(data.userData.latitude);
                setLongitude(data.userData.longitude);

            } else {
                console.error('Failed to fetch user data');
            }

        } catch (error) {
            console.error('Error while fetching user data:', error);
        }
    };




    return (
        <Container maxWidth="md">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={2}
                style={{
                    textAlign: 'center',
                    fontSize: '20px',
                    marginTop: '20px',
                    marginBottom: '2px',
                }}
            >
                <p>
                    Enter User&apos;s Email Id
                </p>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
                <TextField
                    label="Email Id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                <Button variant="contained"
                    style={{
                        margin: '10px', // Adjust spacing
                        borderRadius: '8px', // Add rounded corners
                        fontSize: '16px', // Increase font size
                        fontWeight: 'bold', // Make text bold
                        letterSpacing: '0.5px', // Add letter spacing
                        backgroundColor: '#2196F3', // Set default background color
                        color: '#fff', // Set default text color
                        transition: 'background-color 0.3s', // Add a smooth transition effect
                        '&:hover': {
                            backgroundColor: '#1e90ff', // Change the background on hover to #1e90ff
                        },
                    }}
                    onClick={findProfile}
                >
                    Get Profile
                </Button>
            </Box>
            {userData && (<Paper elevation={3} style={{ padding: 20, marginTop: 40 }}>
                {userData && (
                    <Typography variant="h5" gutterBottom>
                        {userData.name}&apos;s Profile
                    </Typography>
                )}
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
                                    value={latitude}
                                    style={{ color: 'red' }}
                                // disabled
                                />
                                <TextField
                                    // label="Location"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={longitude}
                                    style={{ color: 'red' }}
                                // disabled
                                />
                            </div>
                        )}
                    </Grid>
                </Grid>
            </Paper>
            )}
        </Container>
    );
};

export default FindProfile;
