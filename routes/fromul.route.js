const express = require("express");
const router = express.Router();
const {
  createFormula,
  getAllUsersFormulas,
  deleteFormulaById,
  updateFormulaById,
  getFormulaById,
} = require("../controllers/fromuleControlle");
const protect = require('../middleware/authId')

router.post('/createFormula' , protect, createFormula)
router.get('/getAllUsersFormulas' , getAllUsersFormulas)
router.delete('/deleteFormulaById/:id' , deleteFormulaById)
router.put('/updateFormulaById/:id' , updateFormulaById)
router.get('/getFormulaById/:id' , getFormulaById)

module.exports = router 