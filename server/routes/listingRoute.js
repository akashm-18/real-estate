import express from 'express'
import { verifyToken } from '../utilis/verifyToken.js'
import { createListing } from '../contollers/listingctrl.js';


const router = express.Router()

router.post('/create' , verifyToken , createListing)


export default router;