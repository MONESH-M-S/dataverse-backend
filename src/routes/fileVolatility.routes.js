const express = require("express");
const {
    fetchVolatilityList, fetchIndividualVolatilityFile, fetchColumnMappings,
    updateColumnMapping, fetchDashboardDetails, fetchLeadLogDetails, addTargetColumn
} = require("../controllers/fileVolatilityController");
const { fetchFactColumnMappings, updateColumnMappingValues } = require("../controllers/fileVolatilityFactController");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

// Fact
router.get("/fact", auth, fetchFactColumnMappings);
router.put("/", auth, updateColumnMappingValues)

router.get("/", auth, fetchVolatilityList);
router.get("/dashboard", auth, fetchDashboardDetails);
router.get("/:id", auth, fetchIndividualVolatilityFile);
router.get("/:id/mappings", auth, fetchColumnMappings);
router.put("/:id/mappings", auth, updateColumnMapping);
router.get("/:id/details", auth, fetchLeadLogDetails);
router.post("/:id/target-column", auth, addTargetColumn);

module.exports = router;
