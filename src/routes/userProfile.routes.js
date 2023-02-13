const express = require("express");
const { fetchDummyData, createLibraryData } = require("../controllers/library.controller");
const router = express.Router();

router.get("/", fetchDummyData);
router.get("/create", createLibraryData);

module.exports = router;