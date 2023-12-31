const express = require("express");
const { fetchAuthToken, generateAuthToken } = require("../controllers/authController");
const router = express.Router();

router.get("/", fetchAuthToken);
router.get("/get-token", generateAuthToken);


module.exports = router;