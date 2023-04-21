const express = require("express");
const admins = require("../controllers/admin.controller");

const router = express.Router();


router.route("/")
    .get(admins.findAll);

module.exports = router;