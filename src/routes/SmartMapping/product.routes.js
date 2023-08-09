const express = require('express')
const router = express.Router()

const { fetchProductMapping, fetchProductMappingPagination, downloadProductMapping } = require('../../controllers/SmartMapping/Nielsen/Product/ProductMappingController')
const { fetchProductUnprocessed, fetchProductUnprocessedPagination, downloadProductUnproccessed } = require('../../controllers/SmartMapping/Nielsen/Product/ProductUnprocessedController')

//Nielsen Product Mapped
router.get('/mapped', fetchProductMapping)
router.get('/mapped/count', fetchProductMappingPagination)
router.get('/mapped/download', downloadProductMapping)

//Nielsen Product UnProcessed
router.get('/unprocessed', fetchProductUnprocessed)
router.get('/unprocessed/count', fetchProductUnprocessedPagination);
router.get('/unprocessed/download', downloadProductUnproccessed)

module.exports = router