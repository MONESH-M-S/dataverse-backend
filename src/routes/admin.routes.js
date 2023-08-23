const express = require("express");
const {
  fetchSmlPcatRecords,
  fetchSmlPcatRecordsPagination,
  updateSmlPcatRecords,
  createSmlPcatRecord,
  deleteSmlPcatRecords,
} = require("../controllers/adminController");
const {
  fetchCellControlRecords,
  fetchCellControlRecordsPagination,
  updateCellControlRecords,
  fetchCellControlStatus,
} = require("../controllers/cellControlController");
const {
  criticalAttributesRecords,
  criticalAttributesPagination,
  updateCriticalAttributesRecords,
  createCriticalAttributesRecord,
  deleteCriticalAttributesRecords,
  fetchGlobalDbMeta,
  fetchLocalDbMeta,
  fetchMarketNameCodeMeta
} = require("../controllers/admin/criticalAttributesMetadata");
const {
  fetchFactMetadataRecords,
  fetchFactMetadataRecordsPagination,
  updateFactMetadataRecords,
  createFactMetadataRecord,
  deleteFactMetadataRecords,
  fetchFactCellMeta,
  fetchFactCountryMeta,
  fetchFactNielsenMarketMeta
} = require("../controllers/admin/factMetadata");

const {
  fetchPeriodMetadatRecords,
  fetchPeriodMetadataRecordsPagination,
  updatePeriodMetadataRecords,
  createPeriodMetadataRecord,
  deletePeriodMetadataRecords
} = require("../controllers/admin/periodMetadata");

const router = express.Router();
const auth = require("../middlewares/auth.middleware");

//SML-PCAT
router.get("/sml-pcat", auth, fetchSmlPcatRecords);
router.get("/sml-pcat/count", auth, fetchSmlPcatRecordsPagination);
router.put("/sml-pcat", auth, updateSmlPcatRecords);
router.post("/sml-pcat", auth, createSmlPcatRecord);
router.delete("/sml-pcat", auth, deleteSmlPcatRecords);

// Critical Attributes Metadata
router.get("/critical-attributes", auth, criticalAttributesRecords);
router.get("/critical-attributes/count", auth, criticalAttributesPagination);
router.post("/critical-attributes", auth, createCriticalAttributesRecord);
router.put("/critical-attributes", auth, updateCriticalAttributesRecords);
router.delete("/critical-attributes", auth, deleteCriticalAttributesRecords);
router.get("/critical-attributes/global", auth, fetchGlobalDbMeta)
router.get("/critical-attributes/local", auth, fetchLocalDbMeta)
router.get("/critical-attributes/market", auth, fetchMarketNameCodeMeta)
// Fact Metadata
router.get("/fact", auth, fetchFactMetadataRecords);
router.get("/fact/count", auth, fetchFactMetadataRecordsPagination);
router.post("/fact", auth, createFactMetadataRecord);
router.put("/fact", auth, updateFactMetadataRecords);
router.delete("/fact", auth, deleteFactMetadataRecords);
router.get('/fact/meta/cell', auth, fetchFactCellMeta);
router.get('/fact/meta/country', auth, fetchFactCountryMeta);
router.get('/fact/meta/market', auth, fetchFactNielsenMarketMeta)

//Cell-Control
router.get("/cell-control", auth, fetchCellControlRecords);
router.get("/cell-control/count", auth, fetchCellControlRecordsPagination);
router.get("/cell-control/status", auth, fetchCellControlStatus);
router.put("/cell-control", auth, updateCellControlRecords);
module.exports = router;

router.get("/period",auth, fetchPeriodMetadatRecords);
router.get("/period/count", auth, fetchPeriodMetadataRecordsPagination);
router.post("/period", auth, createPeriodMetadataRecord);
router.delete("/period", auth, deletePeriodMetadataRecords);
router.put("/period", auth, updatePeriodMetadataRecords);
