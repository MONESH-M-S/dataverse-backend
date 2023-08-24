const express = require("express");
const { triggerADFPipeline } = require('../controllers/FileVolatility/CriticalAttributes')
const {
  fetchVolatilityList,
  fetchIndividualVolatilityFile,
  fetchColumnMappings,
  updateColumnMapping,
  fetchDashboardDetails,
  fetchLeadLogDetails,
  addTargetColumn,
  fetchVolatilityListPagination,
  downloadVolatilityList,
} = require("../controllers/fileVolatilityController");
const {
  fetchFactColumnMappings,
  updateColumnMappingFactValues,
} = require("../controllers/fileVolatilityFactController");
const {
  fetchPeriodColumnMappings,
  updateColumnMappingPeriodValues,
} = require("../controllers/fileVolatilityPeriodController");
const auth = require("../middlewares/auth.middleware");
const addTargetSchema = require("../schema/addTarget.schema");
const updateColumnMappingsSchema = require("../schema/updateColumnMappings.schema");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const router = express.Router();

// Fact
router.get("/fact", auth, fetchFactColumnMappings);
router.put("/fact", auth, updateColumnMappingFactValues);

//Period
router.get("/period", auth, fetchPeriodColumnMappings);
router.put("/period", auth, updateColumnMappingPeriodValues);

router.get("/", auth, fetchVolatilityList);
router.get("/count", auth, fetchVolatilityListPagination);
router.get("/dashboard", auth, fetchDashboardDetails);
router.post("/ca-pipeline-trigger", auth, triggerADFPipeline);
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
router.get("/download/records", auth, downloadVolatilityList);

module.exports = router;
