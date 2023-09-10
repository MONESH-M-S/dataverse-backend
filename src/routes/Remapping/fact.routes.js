const express = require('express');
const router = express.Router();
const { updateRemappingFactValues, factRemappingOptions} = require('../../controllers/Remapping/Nielsen/FactRemappingController');
const { updatePosRemappingFactValues, posFactRemappingOptions} = require('../../controllers/Remapping/POS/FactRemappingPOSController')

//Nielsen Fact Remapping
router.get("/fact/:columnName", factRemappingOptions);
router.put("/fact/:id", updateRemappingFactValues);

//POS Fact Remapping
router.get("/pos/fact/:columnName", posFactRemappingOptions);
router.put("/pos/fact/:id", updatePosRemappingFactValues);

module.exports = router