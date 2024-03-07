import express from 'express'
import {signup} from '../contollers/authctrl.js'

const router = express.Router()

router.post('/signup', signup)

export default router;
