import React from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoutes from './components/PrivateRoutes.jsx'
import CreateListing from './pages/CreateListing.jsx'
import UpdateListing from './pages/UpdateListing.jsx'
import Listing from './pages/Listing.jsx'

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about'  element={<About />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />}/>
          <Route path='/update-listing/:listingId' element={<UpdateListing />}/>
          <Route path='/listing/:listingId' element={<Listing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
