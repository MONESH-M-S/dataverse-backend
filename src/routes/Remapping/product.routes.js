const express = require('express');
const router = express.Router();
const { productRemappingOptions, updateRemappingProductValues } = require('../../controllers/Remapping/Nielsen/ProductRemappingController')
const { posProductRemappingOptions, updatePosRemappingProductValues } = require('../../controllers/Remapping/POS/ProductRemappingPOSController')
const {updateOtherRMSRemappingProductValues , otherRMSProductRemappingOptions} =  require('../../controllers/Remapping/OtherRMS/ProductRemappingOtherRmsController')

//Nielsen Product Remapping 
router.get("/:columnName", productRemappingOptions);
router.put("/:id", updateRemappingProductValues);

//POS Product Remapping
router.get("/pos/:columnName", posProductRemappingOptions);
router.put("/pos/:id", updatePosRemappingProductValues);

//OtherRMS Product Remapping
router.get("/other-rms/:columnName", otherRMSProductRemappingOptions)
router.put("/other-rms/:id", updateOtherRMSRemappingProductValues)

module.exports = router