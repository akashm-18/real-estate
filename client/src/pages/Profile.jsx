import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage' 
import { app } from '../firebase.js'
import { updateUserStart , updateUserSuccess , updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser , loading , error } = useSelector(state => state.user)
  const [file,setFile] = useState(undefined)
  const [filePerc,setFilePerc] = useState(0)
  const [fileUploadError,setFileUploadError] = useState(false)
  const [formData,setFormData] = useState({})
  const [updateSuccess,setUpdateSuccess] = useState(false)
  const [showListingsError,setShowListingsError] = useState(false)
  const [userListings,setUserListings] = useState([])

  const dispatch = useDispatch()


  useEffect(() => {
    if(file) {
      handleFileUpload(file)
    }
  } , [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage , fileName)
    const uploadTask = uploadBytesResumable(storageRef,file)

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setFilePerc(Math.round(progress))
    } , (error) => {
      setFileUploadError(true)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadUrl) => setFormData({...formData, avatar : downloadUrl}))
    } )
    
  }

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(updateUserFailure(data.message))
        return;
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method : 'DELETE',
      })
      const data = await res.json()
      if (data.success === false){
        dispatch(deleteUserFailure(data.message))
        return;
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('api/auth/signout')
      const data = await res.json()
      if (data.success === false){
        dispatch(signOutUserFailure(data.message))
        return;
      }
      dispatch(signOutUserSuccess(data.message))
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(false)
      const res = await fetch(`api/user/listings/${currentUser._id}`)
      const data = await res.json()
      if (data.success === false) {
        setShowListingsError(true)
        return
      }
      setUserListings(data)
    } catch (error) {
      setShowListingsError(true)
    }
  }

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`api/listing/delete/${listingId}` , {
        method : 'DELETE'
      })
      const data = await res.json()
      if (data.success === false){
        console.log(data.message)
        return ;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref= {fileRef} hidden accept='image/*' />
        <img src={formData.avatar || currentUser.avatar} alt="profile" onClick={() => fileRef.current.click()}
            className='h-24 w-24 rounded-full object-cover cursor-pointer mt-2 mx-auto' />
        
        <p className='text-sm text-center'>
          {fileUploadError ? (
            <span className='text-red-700'>Error While Uploading Image(Size of image must be 2mb)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'> {`Uploading ${filePerc}%`} </span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image SuccessFully uploaded</span>
          ) : ('') } 
        </p>

        <input type="text" defaultValue={currentUser.username} placeholder='username' id='username' 
              className='p-3 border rounded-lg mt-3' onChange={handleChange}/>
        <input type="email" defaultValue={currentUser.email} placeholder='email' id='email' 
              className='p-3 border rounded-lg mt-3' onChange={handleChange}/>
        <input type="password" placeholder='password' id='password' className='p-3 border rounded-lg mt-3' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase 
            hover:opacity-95 disabled:opacity-80'>
              {loading ? 'Loading...' : 'update'}
        </button>
        <Link to='/create-listing' className='uppercase bg-green-700 p-3 
            text-white rounded-lg text-center hover:opacity-95'>create listing</Link>
      </form>
        <p className='mt-5 text-red-700 text-center'>{error ? error : ''}</p>
        <p className='mt-5 text-green-700 text-center'>{updateSuccess ? 'User updated successfully' : ''}</p>
      <div className='flex flex-row justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span> 
      </div>
      <button onClick={handleShowListings} className='uppercase w-full text-green-700'>show listings</button>
      <p className='text-red-700 mt-5 text-sm'> {showListingsError ? 'Error while showing Listings' : ''} </p>
        {
          userListings && userListings.length > 0 &&  
          <div className='flex flex-col gap-4'>
            <h1 className='uppercase text-center font-semibold mt-7 text-2xl'>your listings</h1>
            {userListings.map((listing) => (
            <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-8'>
              <Link to={`/listing/${listing._id}`}>
              <img src={listing.imageUrls[0]} alt="listing cover" className='h-16 w-18 object-contain '/>
              </Link>
              <Link className=' flex-1 text-slate-700 font-semibold  hover:underline truncate' to={`/listing/${listing._id}`}>
                <p>{listing.name}</p>
              </Link>
              <div className='flex flex-col items-center'>
                <button onClick={() => handleListingDelete(listing._id)} className='uppercase text-red-700'>delete</button>
                <Link to={`/update-listing/${listing._id}`}><button className='uppercase text-green-700'>edit</button></Link>
              </div>
            </div>
          ))}
          </div>
        }
    </div>
  )
}
