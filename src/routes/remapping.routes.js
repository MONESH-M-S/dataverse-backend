const express = require("express");
const router = express.Router();

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
