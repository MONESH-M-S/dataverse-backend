const express = require("express");
const {
    fetchSmatMappingList, fetchSmartMappingDashboardCount, fetchIndividualSmartMapping,
    fetchSmartMappingMappedDetails, fetchSmartMappingUnMappedDetails, updateSmartMappingDetails,
    fetchCategoryMeta, fetchProviderMeta, fetchCountryMeta, fetchSmartMappingMediumResults
} = require("../controllers/smartMappingController");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const updateSmartMappingsSchema = require("../schema/updateSmartMappings.schema");
const validator = require("express-joi-validation").createValidator({
    passError: true,
});

router.get("/meta/category", auth, fetchCategoryMeta);
router.get("/meta/provider", auth, fetchProviderMeta);
router.get("/meta/country", auth, fetchCountryMeta);
router.get("/dashboard", auth, fetchSmartMappingDashboardCount);
router.get("/", auth, fetchSmatMappingList);
router.get("/:id", auth, fetchIndividualSmartMapping);
router.get("/:id/high", auth, fetchSmartMappingMappedDetails);
router.get("/:id/medium", auth, fetchSmartMappingMediumResults);
router.get("/:id/low", auth, fetchSmartMappingUnMappedDetails);
router.put("/:id", auth, validator.body(updateSmartMappingsSchema), updateSmartMappingDetails);

module.exports = router;