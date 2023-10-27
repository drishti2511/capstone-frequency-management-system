// src/SignupForm.js
"use client";
import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Container, CssBaseline } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSession, signOut, signIn } from 'next-auth/react';
import zxcvbn from 'zxcvbn';


const SignupForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const { data: session } = useSession();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !repassword) {
      setError("All fields are necessary.");
      return;
    }

    if (password !== repassword) {
      setError("Passwords do not match.");
      return;
    }

    // setPasswordStrength(zxcvbn(password).score);
    // if(passwordStrength < 1) {
    //   setError("Password is weak. Please choose a stronger password");
    //   return;
    // }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      console.log('signing up');

      const res = await fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          repassword,
        }),
      });

      console.log(res);
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("login");
      } else {
        console.log("User registration failed.");
      }
    }
    catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  const handleGoogleSignUp = async () => {
    const result = await signIn('google');
    if (result?.error) {
      console.error('Google sign-in error:', result.error);
    }
    else{
      if (session) {
        router.push('authhome');
      } else {
        router.push('login');
      }
    }
  };


  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
        <Typography variant="h5">Sign Up</Typography>
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
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Repassword"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            required
          />
          {
            error && (<div style={{ color: 'red' }}>{error}</div>)
          }
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
            Sign Up
          </Button>
        </form>
      </Paper>
      <p>Or</p>
      <Button
        onClick={handleGoogleSignUp}
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: 20 }}
      >
        Sign Up with Google
      </Button>
    </Container>
  );
};

export default SignupForm;
