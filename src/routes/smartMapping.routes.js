const express = require("express");
const {
    fetchSmatMappingList, fetchSmartMappingDashboardCount, fetchIndividualSmartMapping,
    fetchSmartMappingMappedDetails, fetchSmartMappingUnMappedDetails, updateSmartMappingDetails,
    fetchCategoryMeta, fetchProviderMeta, fetchCountryMeta, fetchSmartMappingMediumResults
} = require("../controllers/smartMappingController");
const {
  fetchSmartMappingFactList,
  fetchSmartMappingFactDetail,
  fetchFactCategoryMeta,
  fetchFactCountryMeta,
  fetchFactProviderMeta,
  updateFactSmartMappingDetails,
  fetchLowMappingDetails,fetchMappingDataforLow
} = require("../controllers/smartMappingFactController");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

router.get("/meta/category", auth, fetchCategoryMeta);
router.get("/meta/provider", auth, fetchProviderMeta);
router.get("/meta/country", auth, fetchCountryMeta);
router.get("/dashboard", auth, fetchSmartMappingDashboardCount);
router.get("/", auth, fetchSmatMappingList);
router.get("/:id", auth, fetchIndividualSmartMapping);
router.get("/:id/high", auth, fetchSmartMappingMappedDetails);
router.get("/:id/medium", auth, fetchSmartMappingMediumResults);
router.get("/:id/low", auth, fetchSmartMappingUnMappedDetails);
router.put("/:id", auth, updateSmartMappingDetails);

// Fact
router.get("/fact/summary", auth, fetchSmartMappingFactList);
router.get("/fact/details", auth, fetchSmartMappingFactDetail);
router.get("/fact/details/low", auth, fetchLowMappingDetails);
router.get("/fact/details/low-map", auth, fetchMappingDataforLow);
router.post("/fact/low/:id", auth, updateFactSmartMappingDetails);

// Fact Filters
router.get("/fact/meta/category/", auth, fetchFactCategoryMeta);
router.get("/fact/meta/provider/", auth, fetchFactProviderMeta);
router.get("/fact/meta/country/", auth, fetchFactCountryMeta);

module.exports = router;
