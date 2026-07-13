const express = require("express");
const router = express.Router();
const {
  createFormula,
  getAllUsersFormulas,
  deleteFormulaById,
  updateFormulaById,
  getFormulaById,
} = require("../controllers/fromuleControlle");

router.post('/createFormula' , createFormula)
router.get('/getAllUsersFormulas' , getAllUsersFormulas)
router.delete('/deleteFormulaById/:id' , deleteFormulaById)
router.put('/updateFormulaById/:id' , updateFormulaById)
router.get('/getFormulaById/:id' , getFormulaById)

module.exports = router 