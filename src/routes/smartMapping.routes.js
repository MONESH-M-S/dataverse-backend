const express = require("express");
const {
  fetchSmartMappingList,
  fetchSmartMappingDashboardCount,
  fetchIndividualSmartMapping,
  fetchSmartMappingMappedDetails,
  fetchSmartMappingUnMappedDetails,
  updateSmartMappingDetails,
  fetchCategoryMeta,
  fetchProviderMeta,
  fetchCountryMeta,
  fetchSmartMappingMediumResults,
  fetchUnmappedRecordsSuggestions,
  fetchMappedRecordsForPeriodDimension,
  fetchMappedRecordsForMarketDimension,
  fetchUnprocessedRecords,
  downloadUnProcessedExcel,
  fetchSmartMappingListPagination,
  fetchUnprocessedProductRecords,
  fetchSmartMappingMappedDetailsPagination,
  fetchSmartMappingMediumResultsPagination,
  fetchUnprocessedProductRecordsPagination,
  fetchMappedRecordsForMarketDimensionPagination,
  fetchUnproccessedMarket,
  fetchUnproccessedMarketCount,
  fetchMappedRecordsForPeriodDimensionPagination,
  downloadProductExcelFile,
  downloadFactExcelFile,
  downloadMarketExcelFile,
  downloadPeriodExcelFile,
} = require("../controllers/smartMappingController");

const {
  fetchMappingProductPOSDetails,
  fetchMappingProductPOSDetailsPagination,
  fetchMappingPeriodPOSDetails,
  fetchMappingPeriodPOSDetailsPagination,
  fetchUnmappedPOSRecordsSuggestions,
  updateSmartMappingPOSDetails,
  downloadPosProductExcelFile,
  downloadPosPeriodExcelFile,
} = require("../controllers/smartMappingPosController");

const {
  fetchSmartMappingFactList,
  fetchSmartMappingFactDetail,
  fetchFactCategoryMeta,
  fetchFactCountryMeta,
  fetchFactProviderMeta,
  updateFactSmartMappingLowDetails,
  fetchLowMappingDetails,
  fetchMappingDataforLow,
  fetchSmartMappingFactById,
  fetchSmartMappingFactListPagination,
  fetchSmartMappingFactDetailPagination,
  fetchFactUnprocessed,
  fetchFactUnprocessedCount,
} = require("../controllers/smartMappingFactController");

const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const updateSmartMappingsSchema = require("../schema/updateSmartMappings.schema");
const validator = require("express-joi-validation").createValidator({
  passError: true,
});

router.get("/meta/category", auth, fetchCategoryMeta);
router.get("/meta/provider", auth, fetchProviderMeta);
router.get("/meta/country", auth, fetchCountryMeta);
router.get("/dashboard", auth, fetchSmartMappingDashboardCount);
router.get("/", auth, fetchSmartMappingList);
router.get("/count", auth, fetchSmartMappingListPagination);
router.get("/:id", auth, fetchIndividualSmartMapping);
router.get("/:id/high", auth, fetchSmartMappingMappedDetails);
router.get("/:id/high/count", auth, fetchSmartMappingMappedDetailsPagination);
router.get("/:id/medium", auth, fetchSmartMappingMediumResults);
router.get("/:id/medium/count", auth, fetchSmartMappingMediumResultsPagination);
router.get("/:id/low", auth, fetchSmartMappingUnMappedDetails);
router.get("/:id/unprocessed", auth, fetchUnprocessedRecords);
router.get("/:id/product/unprocessed", auth, fetchUnprocessedProductRecords); // updated query for product unprocessed
router.get(
  "/:id/product/unprocessed/count",
  auth,
  fetchUnprocessedProductRecordsPagination
); // updated query for product unprocessed
router.get("/:id/unprocessed/download", auth, downloadUnProcessedExcel);
router.put(
  "/:id",
  auth,
  validator.body(updateSmartMappingsSchema),
  updateSmartMappingDetails
);
router.get("/:id/suggestion", auth, fetchUnmappedRecordsSuggestions);
router.get("/:id/period/mapped", auth, fetchMappedRecordsForPeriodDimension);
router.get(
  "/:id/period/mapped/count",
  auth,
  fetchMappedRecordsForPeriodDimensionPagination
);

router.get("/:id/market/unprocessed", auth, fetchUnproccessedMarket);
router.get("/:id/market/unprocessed/count", auth, fetchUnproccessedMarketCount);

router.get(
  "/:id/market/:confidenceLevel",
  auth,
  fetchMappedRecordsForMarketDimension
);
router.get(
  "/:id/market/:confidenceLevel/count",
  auth,
  fetchMappedRecordsForMarketDimensionPagination
);

// Fact
router.get("/fact/summary", auth, fetchSmartMappingFactList);
router.get("/fact/summary/count", auth, fetchSmartMappingFactListPagination);
router.get("/fact/details", auth, fetchSmartMappingFactDetail);
router.get("/fact/details/count", auth, fetchSmartMappingFactDetailPagination);
router.get("/fact/details/low", auth, fetchLowMappingDetails);
router.get("/fact/details/low-map", auth, fetchMappingDataforLow);
router.get("/fact/details/unprocessed", auth, fetchFactUnprocessed);
router.get("/fact/details/unprocessed/count", auth, fetchFactUnprocessedCount);
router.get("/fact/:id", auth, fetchSmartMappingFactById);
router.put("/fact/details/low", auth, updateFactSmartMappingLowDetails);

// Fact Filters
router.get("/fact/meta/category", auth, fetchFactCategoryMeta);
router.get("/fact/meta/provider", auth, fetchFactProviderMeta);
router.get("/fact/meta/country", auth, fetchFactCountryMeta);

//Download
router.get("/:id/download/product", auth, downloadProductExcelFile);
router.get("/:id/download/fact", auth, downloadFactExcelFile);
router.get("/:id/download/market", auth, downloadMarketExcelFile);
router.get("/:id/download/period", auth, downloadPeriodExcelFile);

//POS product details
router.get("/product/pos/:id/:confidence", auth, fetchMappingProductPOSDetails);
router.get(
  "/product/pos/:id/:confidence/count",
  auth,
  fetchMappingProductPOSDetailsPagination
);
router.get(
  "/product/pos/low/:id/suggestion",
  auth,
  fetchUnmappedPOSRecordsSuggestions
);
router.put(
  "/pos/:id",
  auth,
  validator.body(updateSmartMappingsSchema),
  updateSmartMappingPOSDetails
);

//POS period details
router.get("/period/pos/:id/:confidence", auth, fetchMappingPeriodPOSDetails);
router.get(
  "/period/pos/:id/:confidence/count",
  auth,
  fetchMappingPeriodPOSDetailsPagination
);

//Download POS
router.get("/pos/:id/download/product", auth, downloadPosProductExcelFile);
router.get("/pos/:id/download/period", auth, downloadPosPeriodExcelFile);

module.exports = router;
