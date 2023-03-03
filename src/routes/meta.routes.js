const express = require("express");
const { fetchCountryMeta, fetchProviderMeta } = require("../controllers/metaController");
const router = express.Router();

router.get("/country", fetchCountryMeta);
router.get("/provider", fetchProviderMeta);

module.exports = router;