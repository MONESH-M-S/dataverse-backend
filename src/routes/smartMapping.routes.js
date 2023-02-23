const express = require("express");
const { fetchSmatMappingList, fetchSmartMappingDashboardCount } = require("../controllers/smartMappingController");
const router = express.Router();

router.get("/", fetchSmatMappingList);
router.get("/dashboard", fetchSmartMappingDashboardCount);

module.exports = router;