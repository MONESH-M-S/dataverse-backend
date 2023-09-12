const express = require('express');
const router = express.Router();
const { marketRemappingOptions, updateRemappingMarketValues } =  require('../../controllers/Remapping/Nielsen/MarketRemappingController')
const { posMarketRemappingOptions, updatePosRemappingMarketValues } = require('../../controllers/Remapping/POS/MarketRemappingPOSController')

//Nielsen market Remapping
router.get("/:columnName", marketRemappingOptions);
router.put("/:id", updateRemappingMarketValues);

//POS market Remapping
router.get("/pos/:columnName", posMarketRemappingOptions);
router.put("/pos/:id", updatePosRemappingMarketValues);

module.exports = router