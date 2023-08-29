const express = require("express");
const {
  fetchSmlPcatRecords,
  fetchSmlPcatRecordsPagination,
  updateSmlPcatRecords,
  createSmlPcatRecord,
  deleteSmlPcatRecords,
  createBulkSmlPcatRecord,
} = require("../controllers/Admin/smlPcat");
const {
  fetchCellControlRecords,
  updateCellControlRecords,
  fetchCellControlStatus,
} = require("../controllers/Admin/cellControl");
const {
  criticalAttributesRecords,
  criticalAttributesPagination,
  updateCriticalAttributesRecords,
  createCriticalAttributesRecords,
  deleteCriticalAttributesRecords,
  fetchGlobalDbMeta,
  fetchLocalDbMeta,
  fetchMarketNameCodeMeta,
} = require("../controllers/Admin/criticalAttributesMetadata");
const {
  fetchFactMetadataRecords,
  fetchFactMetadataRecordsPagination,
  updateFactMetadataRecords,
  deleteFactMetadataRecords,
  fetchFactCellMeta,
  fetchFactCountryMeta,
  fetchFactNielsenMarketMeta,
  createFactMetadataRecords,
} = require("../controllers/Admin/factMetadata");

const {
  fetchPeriodMetadatRecords,
  fetchPeriodMetadataRecordsPagination,
  updatePeriodMetadataRecords,
  createPeriodMetadataRecord,
  deletePeriodMetadataRecords,
} = require("../controllers/admin/periodMetadata");

const {
  fetchMarketMetadataRecords,
  fetchMarketMetadataRecordsPagination,
  updateMarketMetadataRecords,
  deleteMarketMetadataRecords,
  createMarketMetadataRecords,
} = require("../controllers/Admin/marketMetadata");

const router = express.Router();
const auth = require("../middlewares/auth.middleware");

//SML-PCAT
router.get("/sml-pcat", auth, fetchSmlPcatRecords);
router.get("/sml-pcat/count", auth, fetchSmlPcatRecordsPagination);
router.put("/sml-pcat", auth, updateSmlPcatRecords);
router.post("/sml-pcat", auth, createSmlPcatRecord);
router.post("/sml-pcat/bulk-create", auth, createBulkSmlPcatRecord);
router.delete("/sml-pcat", auth, deleteSmlPcatRecords);

// Critical Attributes Metadata
router.get("/critical-attributes", auth, criticalAttributesRecords);
router.get("/critical-attributes/count", auth, criticalAttributesPagination);
router.post("/critical-attributes", auth, createCriticalAttributesRecords);
router.put("/critical-attributes", auth, updateCriticalAttributesRecords);
router.delete("/critical-attributes", auth, deleteCriticalAttributesRecords);
router.get("/critical-attributes/global", auth, fetchGlobalDbMeta);
router.get("/critical-attributes/local", auth, fetchLocalDbMeta);
router.get("/critical-attributes/market", auth, fetchMarketNameCodeMeta);
// Fact Metadata
router.get("/fact", auth, fetchFactMetadataRecords);
router.get("/fact/count", auth, fetchFactMetadataRecordsPagination);
router.post("/fact", auth, createFactMetadataRecords);
router.put("/fact", auth, updateFactMetadataRecords);
router.delete("/fact", auth, deleteFactMetadataRecords);
router.get("/fact/meta/cell", auth, fetchFactCellMeta);
router.get("/fact/meta/country", auth, fetchFactCountryMeta);
router.get("/fact/meta/market", auth, fetchFactNielsenMarketMeta);

//Cell-Control
router.get("/cell-control", auth, fetchCellControlRecords);
router.get("/cell-control/status", auth, fetchCellControlStatus);
router.put("/cell-control", auth, updateCellControlRecords);

// Market Metadata
router.get("/market", auth, fetchMarketMetadataRecords);
router.get("/market/count", auth, fetchMarketMetadataRecordsPagination);
router.post("/market", auth, createMarketMetadataRecords);
router.put("/market", auth, updateMarketMetadataRecords);
router.delete("/market", auth, deleteMarketMetadataRecords);
module.exports = router;

router.get("/period", auth, fetchPeriodMetadatRecords);
router.get("/period/count", auth, fetchPeriodMetadataRecordsPagination);
router.post("/period", auth, createPeriodMetadataRecord);
router.delete("/period", auth, deletePeriodMetadataRecords);
router.put("/period", auth, updatePeriodMetadataRecords);
