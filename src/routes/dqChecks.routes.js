const express = require("express");
const auth = require("../middlewares/auth.middleware");
const {
    fetchSummaryStatus, fetchDQChecksData, fetchDQCategoryMeta,
    fetchDQCountryMeta, downloadDQCheckReport
} = require("../controllers/dqCheckController");
const router = express.Router();

router.get("/stats", auth, fetchSummaryStatus);
router.get("/", auth, fetchDQChecksData);
router.get("/report", auth, downloadDQCheckReport);
router.get("/meta/country", auth, fetchDQCountryMeta);
router.get("/meta/category", auth, fetchDQCategoryMeta);

module.exports = router;