import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact({listing}) {
    const [landLord , setLandLord] = useState(null)
    const [message , setMessage] = useState('')

    useEffect(() => {
        const fetchLandLord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`)
                const data = await res.json()
                setLandLord(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchLandLord()
    },[listing.userRef])

    const onChange = (e) => {
        setMessage(e.target.value)
    }

  return (
    <>
     {landLord && (
        <div className='flex flex-col gap-2'>
            <p>Contact <span className='font-semibold'>{landLord.username } </span> 
                for <span className='font-semibold'>{listing.name}</span></p>
            <textarea placeholder='Enter the message' name="message" id="message" rows="2" 
            value={message} onChange={onChange} className='focus:outline-none p-3 w-full 
                rounded-lg border'></textarea>
            <Link className='bg-slate-700 text-white text-center
                p-3 uppercase rounded-lg hover:opacity-95'
             to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`}>Send Message</Link>
        </div>
     )} 
    </>
  )
}
