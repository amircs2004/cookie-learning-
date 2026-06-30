const express = require("express");
const router = express.Router();
const { loginUser, registerUser } = require("../controllers/authCintroller");

router.post("/api/login", loginUser);
router.post("/api/register", registerUser);


module.exports = router