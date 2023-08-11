const express = require("express");
const router = express.Router();

const {
    fetchTableRecords,
    fetchTableRecordsCount,
    downloadOtherRMSExcel
} = require("../../../controllers/SmartMapping/OtherRMS/OtherRMSController");

router.get("/detail", fetchTableRecords);
router.get("/detail/count", fetchTableRecordsCount);
router.get("/download/:type", downloadOtherRMSExcel);

module.exports = router;