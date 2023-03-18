const express = require("express");
const {
    fetchSmatMappingList, fetchSmartMappingDashboardCount, fetchIndividualSmartMapping,
    fetchSmartMappingMappedDetails, fetchSmartMappingUnMappedDetails, updateSmartMappingDetails,
    fetchCategoryMeta, fetchProviderMeta, fetchCountryMeta
} = require("../controllers/smartMappingController");
const router = express.Router();

router.get("/meta/category", fetchCategoryMeta);
router.get("/meta/provider", fetchProviderMeta);
router.get("/meta/country", fetchCountryMeta);
router.get("/dashboard", fetchSmartMappingDashboardCount);
router.get("/", fetchSmatMappingList);
router.get("/:id", fetchIndividualSmartMapping);
router.get("/:id/mapped", fetchSmartMappingMappedDetails);
router.get("/:id/un-mapped", fetchSmartMappingUnMappedDetails);
router.put("/:id", updateSmartMappingDetails);

module.exports = router;