const { factRemappingOptions } = require("../controllers/remappingController");

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

router.get("/fact/:columnName", auth, factRemappingOptions);

module.exports = router;
