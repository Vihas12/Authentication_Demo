import React from 'react'
import RegisterForm from '@/components/RegisterForm'
import { getServerSession } from 'next-auth';
import {redirect} from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

const Register = async () => {
  const sessions = await getServerSession(authOptions);
 
  if (sessions) {
    redirect('/dashboard');
  }
  
  return (
    <RegisterForm />
  )
}

export default Register
