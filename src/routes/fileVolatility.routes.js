const express = require("express");
const {
    fetchVolatilityList, fetchIndividualVolatilityFile, fetchColumnMappings,
    updateColumnMapping, fetchDashboardDetails, fetchLeadLogDetails, addTargetColumn
} = require("../controllers/fileVolatilityController");
const { fetchFactColumnMappings, updateColumnMappingValues } = require("../controllers/fileVolatilityFactController");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const addTargetSchema = require("../schema/addTarget.schema");
const updateColumnMappingsSchema = require("../schema/updateColumnMappings.schema");
const validator = require("express-joi-validation").createValidator({
    passError: true,
});

// Fact
router.get("/fact", auth, fetchFactColumnMappings);
router.put("/", auth, updateColumnMappingValues)

router.get("/", auth, fetchVolatilityList);
router.get("/dashboard", auth, fetchDashboardDetails);
router.get("/:id", auth, fetchIndividualVolatilityFile);
router.get("/:id/mappings", auth, fetchColumnMappings);
router.put("/:id/mappings", auth, validator.body(updateColumnMappingsSchema), updateColumnMapping);
router.get("/:id/details", auth, fetchLeadLogDetails);
router.post("/:id/target-column", auth, validator.body(addTargetSchema), addTargetColumn);

module.exports = router;
