import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signInStart , signInSuccess , signInFailure } from '../redux/user/userSlice.js'

export default function SignIn() {
  const [formData,setFormData] = useState({})
  const {loading , error} = useSelector(state => state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData ,
      [e.target.id] : e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin' , {
        method : 'POST' ,
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/')

    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='email' className='border p-3 rounded-lg focus:outline-none' 
          id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg focus:outline-none' 
          id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-90 
          disabled:opacity-80'> {loading ? 'loading' : 'Sign In'} </button>
      </form>
      <div className='flex gap-3 my-3'>
        <p>Dont Have an account ? </p>
        <Link to='/sign-un'>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      { error && <p className='text-red-500 mt-5 font-semibold flex justify-center'> {error} </p> }
    </div>
  )
}
