// src/UserInfo.js
"use client";
import React from 'react';
import { Typography, Container, CssBaseline } from '@mui/material';
import {signOut} from 'next-auth/react';
import { useSession } from "next-auth/react";


const UserInfo = () => {
  // Replace this with actual user data retrieval logic
  const { data: session } = useSession();
  console.log(session);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">User Information</Typography>
        <Typography variant="subtitle1">
          Name: {session?.user?.firstName}
        </Typography>
        <Typography variant="subtitle1">Email: {session?.user?.email}</Typography>
      </div>
      <button onClick={() => signOut()}>Sign Out</button>
    </Container>
  );
};

export default UserInfo;
