const express = require('express');
const router = express.Router();
const { productRemappingOptions, updateRemappingProductValues } = require('../../controllers/Remapping/Nielsen/ProductRemappingController')
const { posProductRemappingOptions, updatePosRemappingProductValues } = require('../../controllers/Remapping/POS/ProductRemappingPOSController')


//Nielsen Product Remapping 
router.get("/:columnName", productRemappingOptions);
router.put("/:id", updateRemappingProductValues);

//POS Product Remapping
router.get("/pos/:columnName", posProductRemappingOptions);
router.put("/pos/:id", updatePosRemappingProductValues);

module.exports = router