import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'

export default function ListingItem({listing}) {
  return (
    <div className='bg-white shadow-md w-[245px] hover:shadow-lg transition-shadow
        overflow-hidden rounded-lg'>
      <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0]} alt="image cover"
        className='h-[320px] sm:h-[220px] w-full object-cover 
            hover:scale-105 transition-scale duration-300   ' />
        <div className='p-3 flex flex-col gap-2 w-full'>
            <p className='truncate text-lg font-semibold text-slate-700'> {listing.name} </p>
            <div className='flex items-center gap-2'>
                <MdLocationOn className='h-4 w-4 text-green-700' />
                <p className='text-sm text-gray-600 truncate w-full'>{listing.address}</p>
            </div>
            <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
            <p className='text-slate-500 mt-2 font-semibold flex gap-2 items-center'> Rs :  {listing.offer ? 
            listing.discountPrice.toLocaleString('en-IN') : listing.regularPrice.toLocaleString('en-IN')} 
              <span> {listing.type === 'rent' && '/ month'} </span>  </p>
            <div className='flex gap-4'>
                <p className='font-semibold text-slate-700'>{listing.bedrooms > 0 && listing.bedrooms}  beds</p>
                <p className='font-semibold text-slate-700'>{ listing.bathrooms > 0 && listing.bathrooms} bathrooms</p>
            </div>
        </div>
      </Link>
    </div>
  )
}
