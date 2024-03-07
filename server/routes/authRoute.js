import express from 'express'
import {signin, signup} from '../contollers/authctrl.js'

const router = express.Router()

router.post('/signup', signup)
router.get('/signin' , signin)

export default router;
