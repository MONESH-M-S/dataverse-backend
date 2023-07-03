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
  posMarketRemappingOptions,
  updatePosRemappingMarketValues,
  posFactRemappingOptions,
  updatePosRemappingFactValues,
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

//POS Remapping Dropdown Options
router.get("/pos/product/:columnName", auth, posProductRemappingOptions);
router.get("/pos/period/:columnName", auth, posPeriodRemappingOptions);
router.get("/pos/market/:columnName", auth, posMarketRemappingOptions);
router.get("/pos/fact/:columnName", auth, posFactRemappingOptions);

//POS Remapping Update
router.put("/pos/product/:id", auth, updatePosRemappingProductValues);
router.put("/pos/period/:id", auth, updatePosRemappingPeriodValues);
router.put("/pos/market/:id", auth, updatePosRemappingMarketValues);
router.put("/pos/fact/:id", auth, updatePosRemappingFactValues);

module.exports = router;
