const express = require("express");

const router = express.Router();
const auth = require("../../middlewares/auth.middleware");

const {
  readFileFromBlob,
} = require("../../controllers/CA-ValueComparison/ValueComparison");

router.get("/", readFileFromBlob);

module.exports = router;
