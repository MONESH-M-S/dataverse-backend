const express = require("express");
const {
  fetchSmlPcatRecords,
  fetchSmlPcatRecordsPagination,
  updateSmlPcatRecords,
  createSmlPcatRecord,
  deleteSmlPcatRecords,
} = require("../controllers/adminController");
const {
  criticalAttributesRecords,
  criticalAttributesPagination
} = require("../controllers/Admin/criticalAttributesMetadata");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

router.get("/sml-pcat", auth, fetchSmlPcatRecords);
router.get("/sml-pcat/count", auth, fetchSmlPcatRecordsPagination);
router.put("/sml-pcat", auth, updateSmlPcatRecords);
router.post("/sml-pcat", auth, createSmlPcatRecord);
router.delete("/sml-pcat", auth, deleteSmlPcatRecords);

// Critical Attributes Metadata
router.get("/critical-attributes", auth, criticalAttributesRecords);
router.get("/critical-attributes/count", auth, criticalAttributesPagination);

module.exports = router;
