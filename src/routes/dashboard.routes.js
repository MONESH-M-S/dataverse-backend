const express = require("express");
const { fetchVolatilityFileMetrics, fetchFileharmonizationStatus, fetchConfidenceLevel } = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/volatility-file-metrics", fetchVolatilityFileMetrics);
router.get("/file-harmonization-status", fetchFileharmonizationStatus);
router.get("/confidence-level", fetchConfidenceLevel);

module.exports = router;