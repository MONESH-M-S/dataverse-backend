const express = require('express');
const router = express.Router();

const { fetchMarketMapping, fetchMarketMappingPagination, downloadMarketMapping } = require('../../controllers/SmartMapping/Nielsen/Market/MarketMappingController');
const { fetchMarketUnprocessed, fetchMarketUnprocessedPagination, downloadMarketUnprocessed } = require('../../controllers/SmartMapping/Nielsen/Market/MarketUnprocessedController')

//Nielsen Market Mapped
router.get('/mapped', fetchMarketMapping)
router.get('/mapped/count', fetchMarketMappingPagination)
router.get('/mapped/download', downloadMarketMapping)

//Nielsen Market Unprocessed
router.get('/unprocessed', fetchMarketUnprocessed)
router.get('/unprocessed/count', fetchMarketUnprocessedPagination)
router.get('/unprocessed/download',downloadMarketUnprocessed)

module.exports = router