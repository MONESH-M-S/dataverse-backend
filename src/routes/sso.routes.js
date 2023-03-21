const express = require("express");
const { fetchAuthToken } = require("../controllers/authController");
const router = express.Router();

router.get("/", fetchAuthToken);

module.exports = router;