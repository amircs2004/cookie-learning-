const express = require('express')
const router = express.Router()

const testingDataBase  = require('../controllers/test') 

router.get('/test' , testingDataBase )

module.exports = router