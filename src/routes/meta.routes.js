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
router.get("/sml-pcat/category",auth, fetchSmlPcatCategoryMeta);
router.get("/sml-pcat/market",auth, fetchSmlPcatMarketMeta);
router.get("/sml-pcat/segment",auth, fetchSmlPcatSegmentMeta);

//cell-control
router.get("/cell-control/provider",auth, fetchCellControlProviderMeta);
router.get("/cell-control/country",auth, fetchCellControlCountryMeta);
router.get("/cell-control/category",auth, fetchCellControlCategoryMeta);
module.exports = router;
