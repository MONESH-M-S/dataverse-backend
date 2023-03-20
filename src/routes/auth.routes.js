const express = require("express");
const { fetchAuthToken, generateAuthToken, fetchProfile, updateProfile } = require("../controllers/authController");
const router = express.Router();

router.post("/", fetchAuthToken);
router.get("/", fetchAuthToken);
router.get("/profile", fetchProfile);
router.post("/profile", updateProfile);
router.get("/get-token", generateAuthToken);

module.exports = router;