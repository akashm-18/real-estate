import express from 'express'
import { updateUser, userTest } from '../contollers/userCtrl.js'
import { verifyToken } from '../utilis/verifyToken.js'

const router = express.Router()

router.get('/test', userTest)
router.post('/update/:id' , verifyToken , updateUser)

export default router;