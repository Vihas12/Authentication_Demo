"use client"

import Link from 'next/link'
import React , { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
      }

      router.replace("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <div className='grid place-items-center h-screen'>
      <div className='shadow--xl p-5 rounded-lg border-t-4 border-blue-500'>
        <h1 className='text-2xl font-extrabold my-4'>Login</h1>
      
        <form onSubmit={handleLogin} className='flex flex-col gap-3'>
            <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email'/>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='my-2'/>
            <button className='bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer'>Login</button>
       
            {error && <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>{error}</div>}

            <Link href={'/register'} className='mt-3 text-sm text-right'>Don't have an account? <spam className='text-blue-500 underline hover:text-blue-600'>Register</spam></Link>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
