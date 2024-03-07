const express = require('express')
const signup = require('../contollers/authctrl.js')

const router = express.Router()

router.post('/signup', signup)

module.exports = router
