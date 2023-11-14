// AvatarComponent.jsx

import React from 'react';
import Avatar from '@mui/material/Avatar';

const AvatarComponent = ({ name }) => {
  // Extract the initial letter from the name
  const initialLetter = name ? name.charAt(0).toUpperCase() : '';

  return (
    <Avatar
      sx={{
        width: 40,
        height: 40,
        backgroundColor: '#1e90ff', // Blue background color
        color: 'white', // White text color
        fontWeight: 'bold',
      }}
    >
      {initialLetter}
    </Avatar>
  );
};

export default AvatarComponent;
