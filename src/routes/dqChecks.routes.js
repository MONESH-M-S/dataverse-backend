const express = require("express");
const auth = require("../middlewares/auth.middleware");
const { fetchSummaryStatus, fetchDQChecksData, fetchDQCategoryMeta, fetchDQCountryMeta } = require("../controllers/dqCheckController");
const router = express.Router();

router.get("/stats", auth, fetchSummaryStatus);
router.get("/", auth, fetchDQChecksData);
router.get("/meta/country", auth, fetchDQCountryMeta);
router.get("/meta/category", auth, fetchDQCategoryMeta);

module.exports = router;