const express = require('express')
const router = express.Router()

const { fetchProductMapping, fetchProductMappingPagination, downloadProductMapping } = require('../../controllers/SmartMapping/Nielsen/Product/ProductMappingController')
const { fetchProductUnprocessed, fetchProductUnprocessedPagination, downloadProductUnproccessed } = require('../../controllers/SmartMapping/Nielsen/Product/ProductUnprocessedController')

const { fetchProductPOSMapping, fetchProductPOSMappingPagination, downloadProductPOSMapping } = require('../../controllers/SmartMapping/POS/Product/ProductMappingPOSController')
const { fetchProductPOSUnprocessed, fetchProductPOSUnprocessedPagination, downloadProductPOSUnprocessed } = require('../../controllers/SmartMapping/POS/Product/ProductUnprocessedPOSController')

//Nielsen Product Mapped
router.get('/mapped', fetchProductMapping)
router.get('/mapped/count', fetchProductMappingPagination)
router.get('/mapped/download', downloadProductMapping)

//POS Product Mapped
router.get('/pos/mapped', fetchProductPOSMapping)
router.get('/pos/mapped/count', fetchProductPOSMappingPagination)
router.get('/pos/mapped/download', downloadProductPOSMapping)

//Nielsen Product UnProcessed
router.get('/unprocessed', fetchProductUnprocessed)
router.get('/unprocessed/count', fetchProductUnprocessedPagination)
router.get('/unprocessed/download', downloadProductUnproccessed)

//POS Product UnProcessed
router.get('/pos/unprocessed', fetchProductPOSUnprocessed)
router.get('/pos/unprocessed/count', fetchProductPOSUnprocessedPagination)
router.get('/pos/unprocessed/download', downloadProductPOSUnprocessed)

module.exports = router