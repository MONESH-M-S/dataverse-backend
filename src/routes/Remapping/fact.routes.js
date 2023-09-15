const express = require('express');
const router = express.Router();
const { updateRemappingFactValues, factRemappingOptions} = require('../../controllers/Remapping/Nielsen/FactRemappingController');
const { updatePosRemappingFactValues, posFactRemappingOptions} = require('../../controllers/Remapping/POS/FactRemappingPOSController')
const { otherRMSFactRemappingOptions, updateOtherRMSRemappingFactValues } = require('../../controllers/Remapping/OtherRMS/FactRemappingOtherRmsController')

//Nielsen Fact Remapping
router.get("/:columnName", factRemappingOptions);
router.put("/:id", updateRemappingFactValues);

//POS Fact Remapping
router.get("/pos/:columnName", posFactRemappingOptions);
router.put("/pos/:id", updatePosRemappingFactValues);

//Other-RMS Remapping
router.get("/rms/:columnName", otherRMSFactRemappingOptions)
router.put("/rms/:id", updateOtherRMSRemappingFactValues)

module.exports = router