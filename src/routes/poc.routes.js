const express = require("express");
const {
  fetchSmlPcatRecords,
  fetchSmlPcatRecordsPagination,
  updateSmlPcatRecords,
  deleteSmlPcatRecords,
  createSmlPcatRecord,
  createBulkSmlPcatRecord
} = require("../controllers/adminController");

const router = express.Router();
const auth = require("../middlewares/auth.middleware");

//SML-PCAT
router.get("/sml-pcat", auth, fetchSmlPcatRecords);
router.get("/sml-pcat/count", auth, fetchSmlPcatRecordsPagination);
router.put("/sml-pcat", auth, updateSmlPcatRecords);
router.post("/sml-pcat/bulkcreate",auth,createBulkSmlPcatRecord)
router.delete("/sml-pcat", auth, deleteSmlPcatRecords);

module.exports = router;
