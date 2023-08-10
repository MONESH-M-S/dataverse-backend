const express = require('express');
const router = express.Router();

const { fetchMarketMapping, fetchMarketMappingPagination, downloadMarketMapping } = require('../../controllers/SmartMapping/Nielsen/Market/MarketMappingController');
const { fetchMarketUnprocessed, fetchMarketUnprocessedPagination, downloadMarketUnprocessed } = require('../../controllers/SmartMapping/Nielsen/Market/MarketUnprocessedController')
const { fetchMarketPOSMapping, fetchMarketPOSMappingPagination, downloadMarketPosMapping } = require('../../controllers/SmartMapping/POS/Market/MarketMappingPOSController')
//Nielsen Market Mapped
router.get('/mapped', fetchMarketMapping)
router.get('/mapped/count', fetchMarketMappingPagination)
router.get('/mapped/download', downloadMarketMapping)

//POS Market Mapped
router.get('/pos/mapped', fetchMarketPOSMapping)
router.get('/pos/mapped/count', fetchMarketPOSMappingPagination)
router.get('/pos/mapped/download', downloadMarketPosMapping)

//Nielsen Market Unprocessed
router.get('/unprocessed', fetchMarketUnprocessed)
router.get('/unprocessed/count', fetchMarketUnprocessedPagination)
router.get('/unprocessed/download', downloadMarketUnprocessed)

module.exports = router