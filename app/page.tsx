import Image from 'next/image'
import Button from '@mui/material/Button';
import LoginForm from '../components/LoginForm';
import HomePage from '../components/Home';
import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';
import {authOptions} from './api/auth/[...nextauth]/route';

import dynamic from 'next/dynamic';

// const DynamicNavbar = dynamic(() => import('../components/Navbar'), { ssr: false });

export default async function Home() {
  
  return (
    <main>
      {/* <DynamicNavbar/> */}
      <HomePage/>
    </main>
  )
}
