const express = require("express");
const { fetchKeyVaultData, fetchAuthToken, generateAuthToken } = require("../controllers/authController");
const router = express.Router();

router.post("/auth", fetchAuthToken);
router.get("/auth", fetchAuthToken);
router.get("", fetchAuthToken);
router.get("/vault", fetchKeyVaultData);
router.get("/get-token", generateAuthToken);
// router.get("/list", fetchKeyVaultKeysList);

module.exports = router;