const express = require('express');
const router = express.Router();
const { productRemappingOptions, updateRemappingProductValues } = require('../../controllers/Remapping/Nielsen/ProductRemappingController')
const { posProductRemappingOptions, updatePosRemappingProductValues } = require('../../controllers/Remapping/POS/ProductRemappingPOSController')


//Nielsen Product Remapping 
router.get("/product/:columnName", productRemappingOptions);
router.put("/product/:id", updateRemappingProductValues);

//POS Product Remapping
router.get("/pos/product/:columnName", posProductRemappingOptions);
router.put("/pos/product/:id", updatePosRemappingProductValues);

module.exports = router