"use client";
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';



const CreateProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [radioDetails, setRadioDetails] = useState('');
  const [radioSetDetails, setRadioSetDetails] = useState('');
  const [location, setLocation] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);


  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // The result attribute contains the data URL for the image
        const imageDataUrl = reader.result;

        // Update the state with the new profile picture data URL
        setProfilePicture(imageDataUrl);
        setSelectedProfilePicture(file); // Save the selected file
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  <TextField
    label="Profile Picture"
    variant="outlined"
    fullWidth
    margin="normal"
    type="file"
    onChange={handleProfilePictureChange}
  />


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !name || !contactNumber || !designation || !location || !radioDetails || !radioSetDetails) {
      setError("All fields are necessary.");
      return;
    }

    try {
      // const resUserExists = await fetch("api/userExists", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email }),
      // });

      // const { user } = await resUserExists.json();

      // if (user) {
      //   setError("User already exists.");
      //   return;
      // }

      const res = await fetch("api/createprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          contactNumber,
          designation,
          radioDetails,
          radioSetDetails,
          location,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("profile");
      } else {
        console.log("Creating user profile failed.");
      }
    }
    catch (error) {
      console.log("Error during profile creation: ", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ maxWidth: '600px' }}>
      <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px', maxWidth: '1000px' }}>
        <Typography variant="h4" style={{ marginBottom: 20, color: '#333', fontWeight: 'bold' }}>
          Create Profile
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 20 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Contact Number"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
          <TextField
            label="Designation"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <TextField
            label="Radio Details"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            value={radioDetails}
            onChange={(e) => setRadioDetails(e.target.value)}
            required
          />
          <TextField
            label="Radio Set Details"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            value={radioSetDetails}
            onChange={(e) => setRadioSetDetails(e.target.value)}
            required
          />

          {/* <p style={{marginTop: '20px', marginBottom: '-2px'}}>Profile Picture</p>
          <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          type="file"
          onChange={handleProfilePictureChange}
        /> */}
          {/* {
         error && (<div style={{ color: 'red' }}>{error}</div>)
        } */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{
              marginTop: 20,
              backgroundColor: '#4169e1',
              transition: 'background-color 0.3s, box-shadow 0.3s', // Add smooth transitions
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
              '&:hover': {
                backgroundColor: '#1e90ff', // Change the background color on hover
                boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.2)', // Enhance the box shadow on hover
              },
            }}
          >
            Submit
          </Button>

        </form>
      </Paper>
    </Container>
  );
};

export default CreateProfile;
