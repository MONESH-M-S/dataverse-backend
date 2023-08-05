const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth.middleware");

const {
  fetchTableRecords,
  fetchTableRecordsCount,
  downloadOtherRMSExcel
} = require("../../controllers/SmartMapping/OtherRMSController");

router.get("/:id/detail", auth, fetchTableRecords);
router.get("/:id/detail/count", auth, fetchTableRecordsCount);
router.get("/download/:type", auth, downloadOtherRMSExcel);

module.exports = router;