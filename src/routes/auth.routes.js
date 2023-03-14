const express = require("express");
const { fetchKeyValutData } = require("../controllers/authController");
const router = express.Router();

// router.post("/", fetchAuthToken);
router.get("/vault", fetchKeyValutData);

module.exports = router;