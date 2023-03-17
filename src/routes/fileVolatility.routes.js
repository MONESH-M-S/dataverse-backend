const express = require("express");
const {
    fetchVolatilityList, fetchIndividualVolatilityFile, fetchColumnMappings,
    updateColumnMapping, fetchDashboardDetails, fetchLeadLogDetails
} = require("../controllers/fileVolatilityController");
const router = express.Router();

router.get("/", fetchVolatilityList);
router.get("/dashboard", fetchDashboardDetails);
router.get("/:id", fetchIndividualVolatilityFile);
router.get("/:id/mappings", fetchColumnMappings);
router.put("/:id/mappings", updateColumnMapping);
router.get("/:id/details", fetchLeadLogDetails);

module.exports = router;