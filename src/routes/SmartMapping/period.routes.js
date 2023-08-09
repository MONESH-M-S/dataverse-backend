const express = require('express');
const router = express.Router()
const { fetchPeriodMapping, fetchPeriodMappingPagination, downloadPeriodMapping } = require('../../controllers/SmartMapping/Nielsen/Period/PeriodMappingController')

//Nielsen Period Mapped
router.get('/mapped', fetchPeriodMapping);
router.get('/mapped/count', fetchPeriodMappingPagination)
router.get('/mapped/download', downloadPeriodMapping)

module.exports = router