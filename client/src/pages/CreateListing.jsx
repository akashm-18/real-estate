import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import {app} from '../firebase.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function CreateListing() {
    const { currentUser } = useSelector(state => state.user)
    const [files,setFiles] = useState([])
    const [formData,setFormData] = useState({
        imageUrls : [],
        name : '',
        description : '',
        address : '',
        type : 'rent',
        bedrooms : 1,
        bathrooms : 1,
        regularPrice : 100,
        discountPrice : 0,
        offer : false,
        parking : false,
        furnished : false
    })
    
    const [imageUploadError,setImageUploadError] = useState(null)
    const [uploading,setUploading] = useState(false)
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

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

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent'){
            setFormData({
                ...formData,
                type : e.target.id
            })
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setFormData({
                ...formData,
                [e.target.id] : e.target.checked
            })
        }

        if (e.target.type === 'number' || e.target.type === 'textarea' || e.target.type === 'text'){
            setFormData({
                ...formData,
                [e.target.id] : e.target.value,
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (formData.length < 1) return setError('You must upload atleast 1 image')
            if (+formData.regularPrice < +formData.discountPrice) return setError('Regular Price must be lower than Discount Price')
            setLoading(true)
            setError(false)
            const res = await fetch('/api/listing/create',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    ...formData ,
                    userRef : currentUser._id
                })
            })
            const data = await res.json()
            setLoading(false)
            if (data.success === false) {
                setError(data.message)
            }
            navigate(`/listing/${data._id}`)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }
    
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-10'>
        <div className='flex flex-col gap-4 flex-1'>
            <input type="text" placeholder='Name' onChange={handleChange} value={formData.name}
                className='border p-3 rounded-lg focus:outline-none' id='name' maxLength='62' minLength='10' required/>
            <textarea type='text' placeholder='Description' onChange={handleChange} value={formData.description}
                className='border p-3 rounded-lg' id='description' required/>
            <input type="text" placeholder='Address' onChange={handleChange} value={formData.address}
                className='border p-3 rounded-lg' id='address' required/>
            <div className='flex gap-6 flex-wrap'>
                <div className='flex gap-2'>
                    <input type="checkbox" id='sale' className='w-5' onChange={handleChange} checked={formData.type === 'sale'} />
                    <span>Sell</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='rent' className='w-5' onChange={handleChange} checked={formData.type === 'rent'} />
                    <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='parking' className='w-5' onChange={handleChange} checked={formData.parking} />
                    <span>Parking spot</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='furnished' className='w-5' onChange={handleChange} checked={formData.furnished}/>
                    <span>Furnished</span>
                </div>
                <div className='flex gap-2'>
                    <input type="checkbox" id='offer' className='w-5' onChange={handleChange} checked={formData.offer} />
                    <span>Offer</span>
                </div>
            </div>
            <div className='flex flex-wrap gap-4'>
                <div className='flex gap-2 items-center'>
                    <input type="number" id='bedrooms' min='1' max='10' required
                        className='p-3 border border-gray-300 focus:outline-none rounded-lg' onChange={handleChange} value={formData.bedrooms} />
                    <span>Beds</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input  type="number" id='bathrooms' min='1' max='10' required
                        className='p-3 border border-gray-300 focus:outline-none rounded-lg' onChange={handleChange} value={formData.bathrooms} />
                    <span>bathrooms</span>
                </div>
                <div className='flex gap-2 items-center'>
                    <input type="number" id='regularPrice' required
                        className='p-3 border border-gray-300 focus:outline-none rounded-lg' onChange={handleChange} value={formData.regularPrice} />
                    <div className='flex flex-col text-xs'>
                        <span>Regular Price</span>
                        {formData.type === 'rent' && <span> (Rs / month) </span>}
                    </div>
                </div>
                {formData.offer && (
                    <div className='flex gap-2 items-center'>
                    <input type="number" id='discountPrice' required
                        className='p-3 border border-gray-300 focus:outline-none rounded-lg' onChange={handleChange} value={formData.discountPrice} />
                    <div className='flex flex-col text-xs'>
                        <span>Discount Price</span>
                        {formData.type === 'rent' && <span> (Rs / month) </span>}
                    </div>
                </div>
                )}
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
            <button disabled={loading || uploading} className='p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 
                    disabled:opacity-80 uppercase'> {loading ? 'Creating...' : 'create'} </button>
            <p className='text-red-700 text-sm'> {error ? error : ''} </p>
        </div>
      </form>
    </main>
  )
}
