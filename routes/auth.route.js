const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  safeModification,
  getUserInfos,
  
} = require("../controllers/authCintroller");
const {
  hackableUpdate,
  testController,
} = require("../controllers/hackableLogin");
const protect = require("../middleware/authId");
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/hackAbleUpdate/:id", protect, hackableUpdate);
router.get("/testController", testController);
router.put("/safeModification/:id", protect, safeModification);
router.get("/user", protect, getUserInfos);


module.exports = router;
