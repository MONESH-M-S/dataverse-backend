const express = require("express");
const {
  fetchSmlPcatRecords,
  fetchSmlPcatRecordsPagination,
  updateSmlPcatRecords,
} = require("../controllers/adminController");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

router.get("/sml-pcat", auth, fetchSmlPcatRecords);
router.get("/sml-pcat/count", auth, fetchSmlPcatRecordsPagination);
router.put("/sml-pcat", auth, updateSmlPcatRecords);

module.exports = router;
