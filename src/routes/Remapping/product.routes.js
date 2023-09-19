const express = require('express');
const router = express.Router();
const { productRemappingOptions, updateRemappingProductValues, productRemappingUnprocessedOptions, updateRemappingUnprocessedProductOptions } = require('../../controllers/Remapping/Nielsen/Product/ProductRemappingController')
const { posProductRemappingOptions, updatePosRemappingProductValues } = require('../../controllers/Remapping/POS/ProductRemappingPOSController')
const { updateOtherRMSRemappingProductValues , otherRMSProductRemappingOptions } =  require('../../controllers/Remapping/OtherRMS/ProductRemappingOtherRmsController')
const {productRemappingUAOLOptions, updateRemappingUAOLProductValues} = require('../../controllers/Remapping/Nielsen/Product/UAOL/productRemappingUAOLController')

//Nielsen Product Remapping 
router.get("/:columnName", productRemappingOptions);
router.put("/:id", updateRemappingProductValues);

router.get("/uaol-processed/:columnName", productRemappingUAOLOptions);
router.put("/uaol-processed/:id", updateRemappingUAOLProductValues);


//Nielsen Product Unprocessed
router.get("/unprocessed/:columnName", productRemappingUnprocessedOptions);
router.put("/unprocessed/:id", updateRemappingUnprocessedProductOptions);



//POS Product Remapping
router.get("/pos/:columnName", posProductRemappingOptions);
router.put("/pos/:id", updatePosRemappingProductValues);

//OtherRMS Product Remapping
router.get("/rms/:columnName", otherRMSProductRemappingOptions)
router.put("/rms/:id", updateOtherRMSRemappingProductValues)

module.exports = router