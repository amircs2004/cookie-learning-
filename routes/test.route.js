const express = require('express')
const router = express.Router()

const testingDataBase  = require('../controllers/test') 
const { validateWilaya_adressTest } = require('../controllers/validateadreess-wilaya')
router.get('/test' , testingDataBase )
router.post('/validateAdress' , validateWilaya_adressTest )

module.exports = router
