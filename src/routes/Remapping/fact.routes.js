const express = require('express');
const router = express.Router();
const { updateRemappingFactValues, factRemappingOptions} = require('../../controllers/Remapping/Nielsen/FactRemappingController');
const { updatePosRemappingFactValues, posFactRemappingOptions} = require('../../controllers/Remapping/POS/FactRemappingPOSController')

//Nielsen Fact Remapping
router.get("/:columnName", factRemappingOptions);
router.put("/:id", updateRemappingFactValues);

//POS Fact Remapping
router.get("/pos/:columnName", posFactRemappingOptions);
router.put("/pos/:id", updatePosRemappingFactValues);

module.exports = router