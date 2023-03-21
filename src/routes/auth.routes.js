const express = require("express");
const { generateAuthToken, fetchProfile, updateProfile } = require("../controllers/authController");
const router = express.Router();

router.get("/profile", fetchProfile);
router.post("/profile", updateProfile);
router.get("/get-token", generateAuthToken);

module.exports = router;