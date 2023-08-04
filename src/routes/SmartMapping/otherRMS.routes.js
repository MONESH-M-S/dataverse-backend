const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth.middleware");

const {
  fetchTableRecords,
  fetchTableRecordsCount,
} = require("../../controllers/SmartMapping/OtherRMSController");

router.get("/:id/detail", auth, fetchTableRecords);
router.get("/:id/detail/count", auth, fetchTableRecordsCount);

module.exports = router;