const express = require("express");
const { fetchKeyVaultData, fetchAuthToken } = require("../controllers/authController");
const router = express.Router();

router.get("/token", fetchAuthToken);
router.get("/vault", fetchKeyVaultData);
// router.get("/list", fetchKeyVaultKeysList);

module.exports = router;