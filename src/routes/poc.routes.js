const express = require("express");
const {
  fetchSmlPcatRecords,
  fetchSmlPcatRecordsPagination,
} = require("../controllers/adminController");

const router = express.Router();
const auth = require("../middlewares/auth.middleware");

//SML-PCAT
router.get("/sml-pcat", auth, fetchSmlPcatRecords);
router.get("/sml-pcat/count", auth, fetchSmlPcatRecordsPagination);

module.exports = router;
