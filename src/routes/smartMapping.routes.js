const express = require("express");
const { fetchSmatMappingList, fetchSmartMappingDashboardCount, fetchIndividualSmartMapping, fetchSmartMappingMappedDetails, fetchSmartMappingUnMappedDetails } = require("../controllers/smartMappingController");
const router = express.Router();

router.get("/dashboard", fetchSmartMappingDashboardCount);
router.get("/", fetchSmatMappingList);
router.get("/:id", fetchIndividualSmartMapping);
router.get("/:id/mapped", fetchSmartMappingMappedDetails);
router.get("/:id/un-mapped", fetchSmartMappingUnMappedDetails);

module.exports = router;