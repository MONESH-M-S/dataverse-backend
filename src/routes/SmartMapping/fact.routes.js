const express = require("express");
const router = express.Router();
const {
  fetchFactMapping,
  fetchFactMappingPagination,
  downloadFactMapping,
} = require("../../controllers/SmartMapping/Nielsen/Fact/FactMappingController");
const {
  fetchFactUnprocessed,
  fetchFactUnprocessedPagination,
  downloadFactUnprocessed,
} = require("../../controllers/SmartMapping/Nielsen/Fact/FactUnprocessedController");
const {
  fetchFactPOSMapping,
  fetchFactPOSMappingPagination,
  downloadPosFactMapping,
} = require("../../controllers/SmartMapping/POS/Fact/FactMappingPOSController");
const {
  fetchOtherRMSFactMappedCount,
  fetchFactOtherRMSMapping,
  downloadOtherRMSFactExcel,
} = require("../../controllers/SmartMapping/OtherRMS/Fact/FactOtherRMSMappedController");

//Nielsen Fact Mapped
router.get("/mapped", fetchFactMapping);
router.get("/mapped/count", fetchFactMappingPagination);
router.get("/mapped/download", downloadFactMapping);

//POS Fact Mapped
router.get("/pos/mapped", fetchFactPOSMapping);
router.get("/pos/mapped/count", fetchFactPOSMappingPagination);
router.get("/pos/mapped/download", downloadPosFactMapping);

//RMS Fact Mapped
router.get("/rms/mapped", fetchFactOtherRMSMapping);
router.get("/rms/mapped/count", fetchOtherRMSFactMappedCount);
router.get("/rms/mapped/download", downloadOtherRMSFactExcel);

//Nielsen Fact Unproccessed
router.get("/unprocessed", fetchFactUnprocessed);
router.get("/unprocessed/count", fetchFactUnprocessedPagination);
router.get("/unprocessed/download", downloadFactUnprocessed);

module.exports = router;
