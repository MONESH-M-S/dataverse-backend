const express = require("express");
const {
  fetchVolatilityList,
  fetchIndividualVolatilityFile,
  fetchColumnMappings,
  updateColumnMapping,
  fetchDashboardDetails,
  fetchLeadLogDetails,
  addTargetColumn,
  fetchVolatilityListPagination,
} = require("../controllers/fileVolatilityController");
const {
  fetchFactColumnMappings,
  updateColumnMappingFactValues,
} = require("../controllers/fileVolatilityFactController");
const {
  fetchPeriodColumnMappings,
  updateColumnMappingPeriodValues,
} = require("../controllers/fileVolatilityPeriodController");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const addTargetSchema = require("../schema/addTarget.schema");
const updateColumnMappingsSchema = require("../schema/updateColumnMappings.schema");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});

// Fact
router.get("/fact", auth, fetchFactColumnMappings);
router.put("/fact", auth, updateColumnMappingFactValues);

//Period
router.get("/period", auth, fetchPeriodColumnMappings);
router.put("/period", auth, updateColumnMappingPeriodValues);

router.get("/", auth, fetchVolatilityList);
router.get("/count", auth, fetchVolatilityListPagination);
router.get("/dashboard", auth, fetchDashboardDetails);
router.get("/:id", auth, fetchIndividualVolatilityFile);
router.get("/:id/mappings", auth, fetchColumnMappings);
router.put("/:id/mappings", auth, updateColumnMapping);
router.get("/:id/details", auth, fetchLeadLogDetails);
router.post(
  "/:id/target-column",
  auth,
  validator.body(addTargetSchema),
  addTargetColumn
);
router.put("/:id/critical-attributes", auth, updateColumnMapping);

module.exports = router;
