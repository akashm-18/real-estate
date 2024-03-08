import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage' 
import { app } from '../firebase.js'

export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser } = useSelector(state => state.user)
  const [file,setFile] = useState(undefined)
  const [filePerc,setFilePerc] = useState(0)
  const [fileUploadError,setFileUploadError] = useState(false)
  const [formData,setFormData] = useState({})
  console.log(formData)


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

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-3'>
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
