const express = require('express');
const router = express.Router();
const { marketRemappingOptions, updateRemappingMarketValues } =  require('../../controllers/Remapping/Nielsen/MarketRemappingController')
const { posMarketRemappingOptions, updatePosRemappingMarketValues } = require('../../controllers/Remapping/POS/MarketRemappingPOSController')
const { otherRMSMarketRemappingOptions, updateOtherRMSRemappingMarketValues } = require('../../controllers/Remapping/OtherRMS/MarketRemappingOtherRmsController')

//Nielsen market Remapping
router.get("/:columnName", marketRemappingOptions);
router.put("/:id", updateRemappingMarketValues);

//POS market Remapping
router.get("/pos/:columnName", posMarketRemappingOptions);
router.put("/pos/:id", updatePosRemappingMarketValues);

//Other RMS Remapping
router.get("/rms/:columnName", otherRMSMarketRemappingOptions);
router.put("/rms/:id", updateOtherRMSRemappingMarketValues)

module.exports = router