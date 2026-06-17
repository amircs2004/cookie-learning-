const express = require('express')
const router = express.Router()

const testingDataBase  = require('../connection/connection') 

router.get('/test' , testingDataBase )

module.exports = router