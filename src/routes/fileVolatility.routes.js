const express = require("express");
const { fetchVolatilityList, fetchIndividualVolatilityFile, fetchColumnMappings, updateColumnMapping } = require("../controllers/fileVolatilityController");
const router = express.Router();

router.get("/", fetchVolatilityList);
router.get("/:id", fetchIndividualVolatilityFile);
router.get("/:id/mappings", fetchColumnMappings);
router.put("/:id/mappings", updateColumnMapping);

module.exports = router;