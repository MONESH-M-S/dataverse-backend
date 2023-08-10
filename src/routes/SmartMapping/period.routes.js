const express = require('express');
const router = express.Router()
const { fetchPeriodMapping, fetchPeriodMappingPagination, downloadPeriodMapping } = require('../../controllers/SmartMapping/Nielsen/Period/PeriodMappingController')
const { fetchPeriodPOSMapping, fetchPeriodPOSMappingPagination, downloadPeriodPOSMapping } = require('../../controllers/SmartMapping/POS/Period/PeriodMappingPOSController')

//Nielsen Period Mapped
router.get('/mapped', fetchPeriodMapping);
router.get('/mapped/count', fetchPeriodMappingPagination)
router.get('/mapped/download', downloadPeriodMapping)

//POS Period Mapped
router.get('/pos/mapped', fetchPeriodPOSMapping);
router.get('/pos/mapped/count', fetchPeriodPOSMappingPagination)
router.get('/pos/mapped/download', downloadPeriodPOSMapping)

module.exports = router