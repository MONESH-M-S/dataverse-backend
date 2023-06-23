const express = require("express");
const {
  fetchCountryMeta,
  fetchProviderMeta,
  fetchCategoryMeta,
  fetchIMScenarioFlag,
} = require("../controllers/metaController");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

router.get("/country", auth, fetchCountryMeta);
router.get("/provider", auth, fetchProviderMeta);
router.get("/category", auth, fetchCategoryMeta);
router.get("/im-scenario-flag", auth, fetchIMScenarioFlag);

module.exports = router;
