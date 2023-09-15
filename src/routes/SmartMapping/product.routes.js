const express = require('express')
const router = express.Router()

const { fetchProductMapping, fetchProductMappingPagination, downloadProductMapping } = require('../../controllers/SmartMapping/Nielsen/Product/ProductMappingController')
const { fetchProductUnprocessed, fetchProductUnprocessedPagination, downloadProductUnproccessed } = require('../../controllers/SmartMapping/Nielsen/Product/ProductUnprocessedController')

const { fetchProductPOSMapping, fetchProductPOSMappingPagination, downloadProductPOSMapping } = require('../../controllers/SmartMapping/POS/Product/ProductMappingPOSController')
const { fetchProductPOSUnprocessed, fetchProductPOSUnprocessedPagination, downloadProductPOSUnprocessed } = require('../../controllers/SmartMapping/POS/Product/ProductUnprocessedPOSController')

const { fetchOtherRMSProductMappedCount, fetchProductOtherRMSMapping, downloadOtherRMSProductExcel } = require('../../controllers/SmartMapping/OtherRMS/Product/ProductOtherRMSMappedController')
const { fetchProductOtherRMSUnprocessed, fetchProductOtherRMSUnprocessedCount, downloadProductOtherRMSUnprocessed } = require('../../controllers/SmartMapping/OtherRMS/Product/ProductOtherRMSUnprocessedController')

const { ProductUAOLMapping, ProductUAOLMappingCount, downloadUAOLProductMapping } = require('../../controllers/SmartMapping/Nielsen/Product/UAOL/ProductUAOLMappedController')
const { ProductUAOLUnprocessed, ProductUAOLUnprocessedCount, downloadUAOLProductUnproccessed } = require('../../controllers/SmartMapping/Nielsen/Product/UAOL/ProductUAOLUnprocessedController')

//Nielsen Product Mapped
router.get('/mapped', fetchProductMapping)
router.get('/mapped/count', fetchProductMappingPagination)
router.get('/mapped/download', downloadProductMapping)

//POS Product Mapped
router.get('/pos/mapped', fetchProductPOSMapping)
router.get('/pos/mapped/count', fetchProductPOSMappingPagination)
router.get('/pos/mapped/download', downloadProductPOSMapping)

//RMS Product Mapped
router.get('/rms/mapped', fetchProductOtherRMSMapping)
router.get('/rms/mapped/count', fetchOtherRMSProductMappedCount)
router.get('/rms/mapped/download', downloadOtherRMSProductExcel)

//Nielsen Product UnProcessed
router.get('/unprocessed', fetchProductUnprocessed)
router.get('/unprocessed/count', fetchProductUnprocessedPagination)
router.get('/unprocessed/download', downloadProductUnproccessed)

//POS Product UnProcessed
router.get('/pos/unprocessed', fetchProductPOSUnprocessed)
router.get('/pos/unprocessed/count', fetchProductPOSUnprocessedPagination)
router.get('/pos/unprocessed/download', downloadProductPOSUnprocessed)

//RMS Product Unprocessed
router.get('/rms/unprocessed', fetchProductOtherRMSUnprocessed)
router.get('/rms/unprocessed/count', fetchProductOtherRMSUnprocessedCount)
router.get('/rms/unprocessed/download', downloadProductOtherRMSUnprocessed)

//Uaol Flag Mapped
router.get('/uaol-processed',ProductUAOLMapping)
router.get('/uaol-processed/count',ProductUAOLMappingCount)
router.get('/uaol-processed/download',downloadUAOLProductMapping)

//Uaol Flag Unprocessed
router.get('/uaol-unprocessed',ProductUAOLUnprocessed)
router.get('/uaol-unprocessed/count',ProductUAOLUnprocessedCount)
router.get('/uaol-unprocessed/download',downloadUAOLProductUnproccessed)

module.exports = router