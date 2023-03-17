const express = require("express");
const { fetchKeyVaultData } = require("../controllers/authController");
const router = express.Router();

// router.post("/", fetchAuthToken);
router.get("/vault", fetchKeyVaultData);
// router.get("/list", fetchKeyVaultKeysList);

module.exports = router;