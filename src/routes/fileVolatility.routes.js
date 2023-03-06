const express = require("express");
const { fetchVolatilityList, fetchIndividualVolatilityFile, fetchColumnMappings } = require("../controllers/fileVolatilityController");
const router = express.Router();

router.get("/", fetchVolatilityList);
router.get("/:id", fetchIndividualVolatilityFile);
router.get("/:id/mappings", fetchColumnMappings);

module.exports = router;