const express = require("express");
const router = express.Router();

const {
  fetchSmartMappingList,
  fetchSmartMappingDashboardCount,
  fetchIndividualSmartMapping,
  fetchSmartMappingListPagination,
} = require("../controllers/SmartMapping/smartMappingController");

const auth = require("../middlewares/auth.middleware");
const updateSmartMappingsSchema = require("../schema/updateSmartMappings.schema");

const validator = require("express-joi-validation").createValidator({
  passError: true,
});

router.get("/dashboard", auth, fetchSmartMappingDashboardCount);
router.get("/", auth, fetchSmartMappingList);
router.get("/count", auth, fetchSmartMappingListPagination);
router.get("/:id", auth, fetchIndividualSmartMapping);

module.exports = router;
