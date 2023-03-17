const express = require("express");
const { fetchVolatilityFileMetrics, fetchFileharmonizationStatus, fetchConfidenceLevel } = require("../controllers/dashboard.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/volatility-file-metrics", auth, fetchVolatilityFileMetrics);
router.get("/file-harmonization-status", auth, fetchFileharmonizationStatus);
router.get("/confidence-level", auth, fetchConfidenceLevel);

module.exports = router;