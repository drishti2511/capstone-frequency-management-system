// src/LoginForm.js
"use client";
import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Container, CssBaseline } from '@mui/material';
import Link from 'next/link';
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation";


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 20 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
            Sign In
          </Button>
          {
            error && (<div>{error}</div>)
          }
          <Link href="/signup" style={{ marginTop: 20 }}>
              Don&apos;t have an account? Sign up here.
            </Link>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
