import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import {app} from '../firebase.js'

export default function CreateListing() {
    const [files,setFiles] = useState([])
    const [formData,setFormData] = useState({
        imageUrls : [],
    })
    console.log(formData)
    const [imageUploadError,setImageUploadError] = useState(null)
    const [uploading,setUploading] = useState(false)

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7){
            setImageUploadError(false)
            setUploading(true)
            const promises = []
            for (let i = 0; i < files.length; i++){
                promises.push(storeImage(files[i]))
            }
            Promise.all(promises).then((urls) => {
                setFormData({...formData,imageUrls : formData.imageUrls.concat(urls)})
                setImageUploadError(false)
                setUploading(false)
            }).catch((error) => 
                setImageUploadError('Image upload failed (max 2mb per image)'))
        }
        else {
            setImageUploadError('You can only upload 6 images per listing')
            setUploading(false)
        }
    }

    const storeImage = async (file) => {
        return new Promise((ressolve,reject) => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name
            const storageRef = ref(storage,fileName)
            const uploadTask = uploadBytesResumable(storageRef,file)
            uploadTask.on('state_changed',
            (snapshot) => {} ,
            (error) => {
                reject(error)
            } , () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadurl) => {
                    ressolve(downloadurl)
                })
            })
        })
    }

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData , 
            imageUrls : formData.imageUrls.filter((_,i) => i !== index)
        })
    }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
      <form className='flex flex-col sm:flex-row gap-10'>
        <div className='flex flex-col gap-4 flex-1'>
            <input type="text" placeholder='Name'
                className='border p-3 rounded-lg focus:outline-none' id='name' maxLength='62' minLength='10' required/>
            <textarea type='text' placeholder='Description' 
                className='border p-3 rounded-lg' id='description' required/>
            <input type="text" placeholder='Address' 
                className='border p-3 rounded-lg' id='address' required/>
            <div className='flex gap-6 flex-wrap'>
                <div className='flex gap-2'>
                    <input type="checkbox" id='sale' className='w-5'/>
                    <span>Sell</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='rent' className='w-5'/>
                    <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='parking' className='w-5'/>
                    <span>Parking spot</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='furnished' className='w-5'/>
                    <span>Furnished</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='offer' className='w-5'/>
                    <span>Offer</span>
                </div>
            </div>
            <div className='flex flex-wrap gap-4'>
                <div className='flex gap-2 items-center'>
                    <input type="number" id='bedrooms' min='1' max='10' required
                        className='p-3 border border-gray-300 focus:outline-none rounded-lg' />
                    <span>Beds</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input  type="number" id='bathrooms' min='1' max='10' required
                        className='p-3 border border-gray-300 focus:outline-none rounded-lg' />
                    <span>Bathrooms</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="number" id='regularPrice' required
                        className='p-3 border border-gray-300 focus:outline-none rounded-lg' />
                    <div className='flex flex-col text-xs'>
                        <span>Regular Price</span>
                        <span> (Rs / month) </span>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="number" id='discountPrice' required
                        className='p-3 border border-gray-300 focus:outline-none rounded-lg' />
                    <div className='flex flex-col text-xs'>
                        <span>Discount Price</span>
                        <span> (Rs / month) </span>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
            <p className='font-semibold'>Images:
            <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max-6)</span>
            </p>
            <div className='flex gap-4'>
                <input onChange={(e) => setFiles(e.target.files)} type="file" id='images' accept='image/*' multiple 
                    className='p-3 border border-gray-300 rounded w-full' />
                <button type='button' onClick={handleImageSubmit} className='border border-green-700 uppercase p-3 text-green-700
                    rounded hover:shadow-lg disabled:opacity-80'>{uploading ? 'uploading...' : 'upload'}</button>
            </div>
            <p className='text-center text-red-700 text-sm'> {imageUploadError ? imageUploadError : ''} </p>
            { formData.imageUrls.length > 0 && formData.imageUrls.map((url,index) => (
                <div key={url} className='flex justify-between p-3 border items-center'>
                    <img src={url} className='w-20 h-20 object-contain rounded-lg'/>
                    <button type='button' onClick={() => handleRemoveImage(index)} 
                        className='uppercase p-3 text-red-700 rounded-lg hover:opacity-75'>delete</button>
                </div>
            )) }
            <button className='p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80 uppercase'>create listing</button>
        </div>
      </form>
    </main>
  )
}
