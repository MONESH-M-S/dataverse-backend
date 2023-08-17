const express = require("express");
const router = express.Router();

const {
    posPeriodRemappingOptions,
    posProductRemappingOptions,
    posMarketRemappingOptions,
    posFactRemappingOptions,
} = require("../../controllers/Remapping/POS/RemappingPOSOptionsController");

const {
    updatePosRemappingFactValues,
    updatePosRemappingMarketValues,
    updatePosRemappingPeriodValues,
    updatePosRemappingProductValues
} = require('../../controllers/Remapping/POS/RemappingPOSUpdateController')
//POS Remapping Dropdown Options
router.get("/product/:columnName", posProductRemappingOptions);
router.get("/period/:columnName", posPeriodRemappingOptions);
router.get("/market/:columnName", posMarketRemappingOptions);
router.get("/fact/:columnName", posFactRemappingOptions);

//POS Remapping Update
router.put("/product/:id", updatePosRemappingProductValues);
router.put("/period/:id", updatePosRemappingPeriodValues);
router.put("/market/:id", updatePosRemappingMarketValues);
router.put("/fact/:id", updatePosRemappingFactValues);


module.exports = router