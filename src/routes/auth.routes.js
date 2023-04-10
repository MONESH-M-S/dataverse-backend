const express = require("express");
const { generateAuthToken, fetchProfile, updateProfile } = require("../controllers/authController");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const updateProfileSchema = require("../schema/updateProfile.schema");
const validator = require("express-joi-validation").createValidator({
    passError: true,
});

router.get("/profile", auth, fetchProfile);
router.post("/profile", auth, validator.body(updateProfileSchema), updateProfile);
router.get("/get-token", generateAuthToken);

module.exports = router;