import React, { Suspense, lazy } from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom'

import Header from './components/Header.jsx'
import PrivateRoutes from './components/PrivateRoutes.jsx'
import { ErrorBoundary } from 'react-error-boundary'
import fallbackRender from './components/ErrorBoundry.jsx'
import Home from './pages/Home'

// const Home = lazy(() => import('./pages/Home'))
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const About = lazy(() => import('./pages/About'));
const Profile = lazy(() => import('./pages/Profile'));
const CreateListing = lazy(() => import('./pages/CreateListing.jsx'));
const UpdateListing = lazy(() => import('./pages/UpdateListing.jsx'));
const Listing = lazy(() => import('./pages/Listing.jsx'));
const Search = lazy(() => import('./pages/Search.jsx'));

export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <ErrorBoundary FallbackComponent={fallbackRender} onReset={() => {
      window.location.reload()
    }}>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about'  element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />}/>
          <Route path='/update-listing/:listingId' element={<UpdateListing />}/>
        </Route>
      </Routes>
      </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
