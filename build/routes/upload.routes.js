"use strict";

var express = require("express");
require("../../config/passport");
var passport = require("passport");
var requireAuth = passport.authenticate("jwt", {
  session: false
});
var controller = require("../controllers/upload");
var router = express.Router();
var path = "upload";
router.post("/".concat(path), controller.upload, controller.uploadFile);
module.exports = router;