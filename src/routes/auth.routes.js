// /routes/auth.routes.js

const express = require("express");

const controller = require("../controllers/auth.controllers");
const makeExpressCallback = require("./expressCallback");
const router = express.Router();

router.route("/signup").post(makeExpressCallback(controller.signup));
router.route("/login").post(makeExpressCallback(controller.login));

module.exports = router;
