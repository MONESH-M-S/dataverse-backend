const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
  fetchSummaryStatus,
  fetchDQChecksData,
  fetchDQCategoryMeta,
  fetchDQCountryMeta,
  downloadDQCheckReport,
  fetchDQChecksDataCount,
  fetchDQCardStats,
} = require("../controllers/dqCheckController");
const router = express.Router();

router.get("/stats", auth, fetchSummaryStatus);
router.get("/", auth, fetchDQChecksData);
router.get("/count", auth, fetchDQChecksDataCount);
router.get("/report", auth, downloadDQCheckReport);
router.get("/meta/country", auth, fetchDQCountryMeta);
router.get("/meta/category", auth, fetchDQCategoryMeta);
router.get("/card/:stats",auth,fetchDQCardStats);
module.exports = router;
