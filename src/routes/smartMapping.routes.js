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
} = require("../controllers/smartMappingController");
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
router.get("/fact/:id", auth, fetchSmartMappingFactById);
router.put("/fact/details/low", auth, updateFactSmartMappingLowDetails);

// Fact Filters
router.get("/fact/meta/category/", auth, fetchFactCategoryMeta);
router.get("/fact/meta/provider/", auth, fetchFactProviderMeta);
router.get("/fact/meta/country/", auth, fetchFactCountryMeta);

module.exports = router;
