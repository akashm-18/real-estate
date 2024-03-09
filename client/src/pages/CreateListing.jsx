import React from 'react'

export default function CreateListing() {
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
                <input type="file" id='images' accept='image/*' multiple 
                    className='p-3 border border-gray-300 rounded w-full' />
                <button className='border border-green-700 uppercase p-3 text-green-700
                    rounded hover:shadow-lg disabled:opacity-80'>upload</button>
            </div>
            <button className='p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80 uppercase'>create listing</button>
        </div>
      </form>
    </main>
  )
}
