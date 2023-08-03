const express = require("express");
const {
  fetchSmlPcatRecords,
  fetchSmlPcatRecordsPagination,
  updateSmlPcatRecords,
} = require("../controllers/adminController");
const {
  fetchCellControlRecords,
  fetchCellControlRecordsPagination,
  updateCellControlRecords,
  fetchCellControlStatus,
} = require("../controllers/cellControlController");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

//SML-PCAT
router.get("/sml-pcat", auth, fetchSmlPcatRecords);
router.get("/sml-pcat/count", auth, fetchSmlPcatRecordsPagination);
router.put("/sml-pcat", auth, updateSmlPcatRecords);

//Cell-Control
router.get("/cell-control", auth, fetchCellControlRecords);
router.get("/cell-control/count", auth, fetchCellControlRecordsPagination);
router.get("/cell-control/status", auth, fetchCellControlStatus);
router.put("/cell-control", auth, updateCellControlRecords);
module.exports = router;
