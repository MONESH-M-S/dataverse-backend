const express = require("express");
const {
  fetchVolatilityFileMetrics,
  fetchFileharmonizationStatus,
  fetchConfidenceLevel,
  fetchProviderMeta,
} = require("../controllers/dashboard.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/volatility-file-metrics", auth, fetchVolatilityFileMetrics);
router.get("/file-harmonization-status", auth, fetchFileharmonizationStatus);
router.get("/confidence-level", auth, fetchConfidenceLevel);
router.get("/meta/provider", auth, fetchProviderMeta);

module.exports = router;
