const express = require('express');
const router = express.Router();
const { periodRemappingOptions, factRemappingOptions, marketRemappingOptions, productRemappingOptions } = require('../../controllers/Remapping/Nielsen/RemappingOptionsController')
const { updateRemappingProductValues, updateRemappingPeriodValues, updateRemappingFactValues, updateRemappingMarketValues } = require('../../controllers/Remapping/Nielsen/RemappingUpdateController')


//Nielsen Remapping Dropdown Options
router.get("/product/:columnName", productRemappingOptions);
router.get("/fact/:columnName", factRemappingOptions);
router.get("/period/:columnName", periodRemappingOptions);
router.get("/market/:columnName", marketRemappingOptions);

//Nielsen Remapping Update
router.put("/product/:id", updateRemappingProductValues);
router.put("/fact/:id", updateRemappingFactValues);
router.put("/period/:id", updateRemappingPeriodValues);
router.put("/market/:id", updateRemappingMarketValues);

module.exports = router