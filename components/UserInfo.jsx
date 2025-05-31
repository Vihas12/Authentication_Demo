"use client"

import React from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const UserInfo = () => {
  const { data: session } = useSession();


  return (
    <div className='grid place-items-center h-screen'>
        <div className='shadow-xl p-8 bg-zinc-300/10 flex flex-col gap-2 my-6'>
            <div>
                Name: <span className='font-semibold'>{session?.user?.name}</span>
            </div>
            <div>
                Email: <span className='font-semibold'>{session?.user?.email}</span>
            </div>
            <button onClick={() => signOut()} className='bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 cursor-pointer'>Logout</button>
        </div>
      
    </div>
  )
}

export default UserInfo
