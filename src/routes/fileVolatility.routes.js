const express = require("express");
const { fetchVolatilityList, fetchIndividualVolatilityFile } = require("../controllers/fileVolatilityController");
const router = express.Router();

router.get("/", fetchVolatilityList);
router.get("/:id", fetchIndividualVolatilityFile);

module.exports = router;