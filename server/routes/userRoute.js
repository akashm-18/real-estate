const express = require('express')
const { userTest } = require('../contollers/userCtrl.js')

const router = express.Router()

router.get('/test', userTest)

module.exports =  router