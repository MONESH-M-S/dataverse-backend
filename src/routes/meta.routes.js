const express = require("express");
const { fetchCountryMeta, fetchProviderMeta, fetchCategoryMeta } = require("../controllers/metaController");
const router = express.Router();

router.get("/country", fetchCountryMeta);
router.get("/provider", fetchProviderMeta);
router.get("/category", fetchCategoryMeta);

module.exports = router;