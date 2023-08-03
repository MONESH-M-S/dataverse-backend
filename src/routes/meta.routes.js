const express = require("express");
const {
  fetchCountryMeta,
  fetchProviderMeta,
  fetchCategoryMeta,
  fetchIMScenarioFlag,
  fetchSmlPcatCategoryMeta,
  fetchSmlPcatMarketMeta,
  fetchSmlPcatSegmentMeta,
  fetchCellControlProviderMeta,
  fetchCellControlCountryMeta,
  fetchCellControlCategoryMeta,
} = require("../controllers/metaController");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

router.get("/country", auth, fetchCountryMeta);
router.get("/provider", auth, fetchProviderMeta);
router.get("/category", auth, fetchCategoryMeta);
router.get("/im-scenario-flag", auth, fetchIMScenarioFlag);

//sml-pcat
router.get("/sml-pcat/category", fetchSmlPcatCategoryMeta);
router.get("/sml-pcat/market", fetchSmlPcatMarketMeta);
router.get("/sml-pcat/segment", fetchSmlPcatSegmentMeta);

//cell-control
router.get("/cell-control/provider", fetchCellControlProviderMeta);
router.get("/cell-control/country", fetchCellControlCountryMeta);
router.get("/cell-control/category", fetchCellControlCategoryMeta);
module.exports = router;
