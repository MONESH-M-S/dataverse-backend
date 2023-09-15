const express = require('express');
const router = express.Router();
const { updateRemappingPeriodValues, periodRemappingOptions} = require('../../controllers/Remapping/Nielsen/PeriodRemappingController')
const { updatePosRemappingPeriodValues, posPeriodRemappingOptions} = require('../../controllers/Remapping/POS/PeriodRemappingPOSController')
const { otherRMSPeriodRemappingOptions, updateOtherRMSRemappingPeriodValues } = require('../../controllers/Remapping/OtherRMS/PeriodRemappingOtherRmsController')

//Nielsen Period Remapping
router.get("/:columnName", periodRemappingOptions);
router.put("/period/:id", updateRemappingPeriodValues);

//POS Period Remapping
router.get("/pos/:columnName", posPeriodRemappingOptions);
router.put("/pos/:id", updatePosRemappingPeriodValues);

//Other RMS Remapping
router.get("/rms/:columnName", otherRMSPeriodRemappingOptions)
router.put("/rms/:id", updateOtherRMSRemappingPeriodValues)

module.exports = router