import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const { currentUser } = useSelector(state => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-3'>
        <img src={currentUser.avatar} alt="profile"
            className='h-24 w-24 rounded-full object-cover cursor-pointer mt-2 mx-auto' />
        <input type="text" placeholder='username' id='username' className='p-3 border rounded-lg mt-3' />
        <input type="email" placeholder='email' id='email' className='p-3 border rounded-lg mt-3' />
        <input type="text" placeholder='password' id='password' className='p-3 border rounded-lg mt-3' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex flex-row justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
