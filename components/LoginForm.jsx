// src/LoginForm.js
"use client";
import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Container, CssBaseline } from '@mui/material';
import Link from 'next/link';
import { signIn,useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";
import Image from 'next/image'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

 
  const handleSubmit = async (e) => {
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

      localStorage.setItem('email', email);

      router.replace("authhome");
    } catch (error) {
      console.log(error);
    }
  };


  const handleGoogleSignin = async () => {
    const result = await signIn('google')
    if (result?.error) {
      console.error('Google sign-in error:', result.error);
    }
  };

  useEffect(() => {
    if (session && session.user) {
      localStorage.setItem('email', session.user.email);
      router.push("authhome");
    }
  }, [session, router]);

  



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <section className='w-8/4 mx-auto flex flex-col gap-10 mt-10'>
        <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5">Login</Typography>
          <p className="text-gray-400">Please enter your credentials to continue</p>
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
            <div className="input-button" style={{ marginTop: '20px' }}>
              <Button type='button' onClick={handleGoogleSignin}>
                <Image src={'/google.svg'} width="20" height={20} alt='Google Icon' style={{ marginRight: '8px' }} />
                <span>Sign In with Google</span>
              </Button>
            </div>
            {
              error && (<div style={{ color: 'red' }}>{error}</div>)
            }
            <div style={{ marginTop: '20px' }}>
              <Link href="/signup" style={{ marginTop: '4px', textDecoration: 'none', color: 'inherit' }}>
                Do not have an account? <span style={{ borderBottom: '1px solid black', cursor: 'pointer',color: 'inherit' }}>Signup here</span>.
              </Link>
            </div>
          </form>
        </Paper>
      </section>
    </Container>
  );
};

export default LoginForm;
