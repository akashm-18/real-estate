import express from 'express'
import { userTest } from '../contollers/userCtrl.js'

const router = express.Router()

router.get('/test', userTest)

export default router;