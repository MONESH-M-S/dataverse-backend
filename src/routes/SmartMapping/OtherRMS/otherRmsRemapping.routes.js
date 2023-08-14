const express = require("express");
const router = express.Router();

const {
    otherRMSPeriodRemappingOptions,
    otherRMSMarketRemappingOptions,
    otherRMSFactRemappingOptions,
    updateOtherRMSRemappingPeriodValues,
    updateOtherRMSRemappingMarketValues,
    updateOtherRMSRemappingFactValues,
} = require("../../../controllers/SmartMapping/OtherRMS/OtherRMSRemappingController");


//Other RMS Remapping Dropdown Options
router.get("/fact/:columnName", otherRMSFactRemappingOptions);
router.get("/period/:columnName", otherRMSPeriodRemappingOptions);
router.get("/market/:columnName", otherRMSMarketRemappingOptions);

//Other RMS Remapping Update
router.put("/fact/:id", updateOtherRMSRemappingFactValues);
router.put("/period/:id", updateOtherRMSRemappingPeriodValues);
router.put("/market/:id", updateOtherRMSRemappingMarketValues);

module.exports = router;