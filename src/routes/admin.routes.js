const express = require("express");
const {
  fetchSmlPcatRecords,
  fetchSmlPcatRecordsPagination,
  updateSmlPcatRecords,
  createSmlPcatRecord,
  deleteSmlPcatRecords,
} = require("../controllers/adminController");
const {
  fetchFactMetadataRecords,
  fetchFactMetadataRecordsPagination,
  updateFactMetadataRecords,
} = require("../controllers/admin/factMetadata");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

router.get("/sml-pcat", auth, fetchSmlPcatRecords);
router.get("/sml-pcat/count", auth, fetchSmlPcatRecordsPagination);
router.put("/sml-pcat", auth, updateSmlPcatRecords);
router.post("/sml-pcat", auth, createSmlPcatRecord);
router.delete("/sml-pcat", auth, deleteSmlPcatRecords);

// Fact Metadata
router.get("/fact", auth, fetchFactMetadataRecords);
router.get("/fact/count", auth, fetchFactMetadataRecordsPagination);
router.put("/fact", auth, updateFactMetadataRecords);

module.exports = router;
