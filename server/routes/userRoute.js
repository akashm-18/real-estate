import express from 'express'
import { deleteUser, updateUser, userTest } from '../contollers/userCtrl.js'
import { verifyToken } from '../utilis/verifyToken.js'

const router = express.Router()

router.get('/test', userTest)
router.post('/update/:id' , verifyToken , updateUser)
router.delete('/delete/:id' , verifyToken , deleteUser)

export default router;