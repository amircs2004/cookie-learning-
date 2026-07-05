const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/authCintroller");
const {hackableUpdate  , testController} = require('../controllers/hackableLogin')
const protect = require('../middleware/authId')
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/hackAbleUpdate", protect, hackableUpdate);
router.get("/testController", testController);



module.exports = router