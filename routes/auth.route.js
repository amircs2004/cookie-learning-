const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/authCintroller");
const {hackableUpdate  , testController} = require('../controllers/hackableLogin')
router.post("/api/login", loginUser);
router.post("/api/register", registerUser);
router.post("/api/hackAbleUpdate", hackableUpdate);
router.get("/api/testController", testController);



module.exports = router