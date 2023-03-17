const express = require("express");
const { generateAuthToken, fetchProfile, updateProfile } = require("../controllers/authController");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

router.get("/profile", auth, fetchProfile);
router.post("/profile", auth, updateProfile);
router.get("/get-token", generateAuthToken);

module.exports = router;