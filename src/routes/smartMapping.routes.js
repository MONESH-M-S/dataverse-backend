const express = require("express");
const { fetchSmatMappingList, addSmartDataList } = require("../controllers/smartMappingController");
const router = express.Router();

router.get("/dummy-daya", addSmartDataList);
router.get("/", fetchSmatMappingList);

module.exports = router;