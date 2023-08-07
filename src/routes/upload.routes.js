const express = require("express");
require("../../config/passport");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", {
  session: false,
});

const controller = require("../controllers/upload");

const router = express.Router();

const path = "upload";

router.post(`/${path}`, controller.upload, controller.uploadFile);

module.exports = router;
