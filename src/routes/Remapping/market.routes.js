const express = require('express');
const router = express.Router();
const { marketRemappingOptions, updateRemappingMarketValues } =  require('../../controllers/Remapping/Nielsen/MarketRemappingController')
const { posMarketRemappingOptions, updatePosRemappingMarketValues } = require('../../controllers/Remapping/POS/MarketRemappingPOSController')

//Nielsen market Remapping
router.get("/market/:columnName", marketRemappingOptions);
router.put("/market/:id", updateRemappingMarketValues);

//POS market Remapping
router.get("/pos/market/:columnName", posMarketRemappingOptions);
router.put("/pos/market/:id", updatePosRemappingMarketValues);

module.exports = router