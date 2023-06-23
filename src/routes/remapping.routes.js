const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const {
  factRemappingOptions,
  productRemappingOptions,
  periodRemappingOptions,
  marketRemappingOptions,
  updateRemappingProductValues,
  updateRemappingFactValues,
  updateRemappingPeriodValues,
  updateRemappingMarketValues,
} = require("../controllers/remappingController");

const {
  posPeriodRemappingOptions,
  posProductRemappingOptions,
  updatePosRemappingPeriodValues,
  updatePosRemappingProductValues,
} = require("../controllers/posRemappingController");

//Remapping Dropdown Options
router.get("/product/:columnName", auth, productRemappingOptions);
router.get("/fact/:columnName", auth, factRemappingOptions);
router.get("/period/:columnName", auth, periodRemappingOptions);
router.get("/market/:columnName", auth, marketRemappingOptions);

//Remapping Update
router.put("/product/:id", auth, updateRemappingProductValues);
router.put("/fact/:id", auth, updateRemappingFactValues);
router.put("/period/:id", auth, updateRemappingPeriodValues);
router.put("/market/:id", auth, updateRemappingMarketValues);

//Remapping Dropdown Options
router.get("/pos/product/:columnName", auth, posProductRemappingOptions);
router.get("/pos/period/:columnName", auth, posPeriodRemappingOptions);

//Remapping Update
router.put("/pos/product/:id", auth, updatePosRemappingProductValues);
router.put("/pos/period/:id", auth, updatePosRemappingPeriodValues);

module.exports = router;
