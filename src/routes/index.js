const express = require("express");

const users = require("./users.routes");

const router = express.Router();

router.use(users);

module.exports = router;
