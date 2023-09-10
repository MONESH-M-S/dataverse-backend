const express = require('express');
const router = express.Router();
const { updateRemappingPeriodValues, periodRemappingOptions} = require('../../controllers/Remapping/Nielsen/PeriodRemappingController')
const { updatePosRemappingPeriodValues, posPeriodRemappingOptions} = require('../../controllers/Remapping/POS/PeriodRemappingPOSController')

//Nielsen Period Remapping
router.get("/period/:columnName", periodRemappingOptions);
router.put("/period/:id", updateRemappingPeriodValues);

//POS Period Remapping
router.get("/pos/period/:columnName", posPeriodRemappingOptions);
router.put("/pos/period/:id", updatePosRemappingPeriodValues);

module.exports = router