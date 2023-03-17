const express = require("express");
const {
    fetchSmatMappingList, fetchSmartMappingDashboardCount, fetchIndividualSmartMapping,
    fetchSmartMappingMappedDetails, fetchSmartMappingUnMappedDetails, updateSmartMappingDetails,
    fetchCategoryMeta, fetchProviderMeta, fetchCountryMeta
} = require("../controllers/smartMappingController");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

router.get("/meta/category", auth, fetchCategoryMeta);
router.get("/meta/provider", auth, fetchProviderMeta);
router.get("/meta/country", auth, fetchCountryMeta);
router.get("/dashboard", auth, fetchSmartMappingDashboardCount);
router.get("/", auth, fetchSmatMappingList);
router.get("/:id", auth, fetchIndividualSmartMapping);
router.get("/:id/mapped", auth, fetchSmartMappingMappedDetails);
router.get("/:id/un-mapped", fauth, etchSmartMappingUnMappedDetails);
router.put("/:id", auth, updateSmartMappingDetails);

module.exports = router;