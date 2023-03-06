const express = require("express");
const items = require("../controllers/item.controller");

const router = express.Router();

router.route("/")
    .get(items.findAll)
    .post(items.create);

module.exports = router;