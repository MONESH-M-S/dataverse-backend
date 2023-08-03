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
} = require("../controllers/admin/criticalAttributesMetadata");
const {
  fetchFactMetadataRecords,
  fetchFactMetadataRecordsPagination,
  updateFactMetadataRecords,
  createFactMetadataRecord,
  deleteFactMetadataRecords,
} = require("../controllers/admin/factMetadata");
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

// Fact Metadata
router.get("/fact", auth, fetchFactMetadataRecords);
router.get("/fact/count", auth, fetchFactMetadataRecordsPagination);
router.post("/fact", auth, createFactMetadataRecord);
router.put("/fact", auth, updateFactMetadataRecords);
router.delete("/fact", auth, deleteFactMetadataRecords);

//Cell-Control
router.get("/cell-control", auth, fetchCellControlRecords);
router.get("/cell-control/count", auth, fetchCellControlRecordsPagination);
router.get("/cell-control/status", auth, fetchCellControlStatus);
router.put("/cell-control", auth, updateCellControlRecords);
module.exports = router;
