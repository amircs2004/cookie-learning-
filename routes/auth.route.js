const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/authCintroller");
const {hackableUpdate  , testController} = require('../controllers/hackableLogin')
const protect = require('../middleware/authId')
router.post("/api/login", loginUser);
router.post("/api/register", registerUser);
router.post("/api/hackAbleUpdate", protect, hackableUpdate);
router.get("/api/testController", testController);



module.exports = router