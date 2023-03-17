const express = require("express");
const { fetchCountryMeta, fetchProviderMeta, fetchCategoryMeta } = require("../controllers/metaController");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

router.get("/country", auth, fetchCountryMeta);
router.get("/provider", auth, fetchProviderMeta);
router.get("/category", auth, fetchCategoryMeta);

module.exports = router;