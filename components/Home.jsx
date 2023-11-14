"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useRouter } from "next/navigation";

import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function HomePage() {
    const router = useRouter();
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    {/* <CameraIcon sx={{ mr: 2 }} /> */}
                    <Typography variant="h6" color="inherit" noWrap>
                        Welcome
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h3"
                            align="center"
                            color="#333" // Assuming you have a primary color defined in your theme
                            gutterBottom
                            style={{
                                marginTop: 20,
                                marginBottom: 20,
                                fontWeight: 'bold',
                                fontFamily: 'Arial, sans-serif',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', // Add a subtle text shadow
                            }}
                        >
                            Automated Spectrum Management and Frequency Allocation System
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button
                                variant="contained"
                                onClick={() => router.push('login')}
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
                            >
                                Login
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={() => router.push('signup')}
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
                            >
                                Signup
                            </Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={6}>

                        <Grid item xs={20} sm={8} md={6}>
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        // 16:9
                                        pt: '56.25%',
                                    }}
                                    image="https://source.unsplash.com/random?wallpapers"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Learn More
                                    </Typography>
                                    <Typography>
                                        This is a media card. You can use this section to describe the
                                        content.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">View</Button>
                                    <Button size="small">Edit</Button>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid item xs={20} sm={8} md={6}>
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        // 16:9
                                        pt: '56.25%',
                                    }}
                                    image="https://source.unsplash.com/random?wallpapers"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        About Us
                                    </Typography>
                                    <Typography>
                                        This is a media card. You can use this section to describe the
                                        content.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">View</Button>
                                    <Button size="small">Edit</Button>
                                </CardActions>
                            </Card>
                        </Grid>

                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Thank You!
                </Typography>

                {/* <Copyright /> */}
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}