import express from 'express'
import { deleteUser, getUserListings, updateUser, userTest , getUser } from '../contollers/userCtrl.js'
import { verifyToken } from '../utilis/verifyToken.js'

const router = express.Router()

router.get('/test', userTest)
router.post('/update/:id' , verifyToken , updateUser)
router.delete('/delete/:id' , verifyToken , deleteUser)
router.get('/listings/:id' , verifyToken , getUserListings)
router.get('/:id' , verifyToken , getUser)

export default router;