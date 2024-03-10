import express from 'express'
import { verifyToken } from '../utilis/verifyToken.js'
import { createListing, deleteListing } from '../contollers/listingctrl.js';


const router = express.Router()

router.post('/create' , verifyToken , createListing)
router.delete('/delete/:id' , verifyToken , deleteListing)


export default router;