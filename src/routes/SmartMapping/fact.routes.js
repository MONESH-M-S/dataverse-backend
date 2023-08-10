const express = require('express');
const router = express.Router()
const { fetchFactMapping, fetchFactMappingPagination, downloadFactMapping } = require('../../controllers/SmartMapping/Nielsen/Fact/FactMappingController')
const { fetchFactUnprocessed, fetchFactUnprocessedPagination, downloadFactUnprocessed } = require('../../controllers/SmartMapping/Nielsen/Fact/FactUnprocessedController')

//Nielsen Fact Mapped
router.get('/mapped', fetchFactMapping);
router.get('/mapped/count', fetchFactMappingPagination)
router.get('/mapped/download', downloadFactMapping);


//Nielsen Fact Unproccessed
router.get('/unprocessed', fetchFactUnprocessed);
router.get('/unprocessed/count', fetchFactUnprocessedPagination)
router.get('/unprocessed/download', downloadFactUnprocessed);

module.exports = router