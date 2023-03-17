const express = require("express");
const { fetchKeyVaultData, fetchAuthToken } = require("../controllers/authController");
const router = express.Router();

router.get("/auth", fetchAuthToken);
router.get("/vault", fetchKeyVaultData);
// router.get("/list", fetchKeyVaultKeysList);

module.exports = router;