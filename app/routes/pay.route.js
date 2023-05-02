const express = require("express");
const pays = require("../controllers/pay.controller");

const router = express.Router();

router.route("/")
    .get(pays.findAll)
    .post(pays.createOrder);
router.route("/update/:id")
    .put(pays.update);
router.route("/backStatus/:id")
    .put(pays.backStatus);

router.route("/:email")
    .get(pays.findOrderByEmail);

router.route("/cancleOrder")
    .post(pays.cancleOrder);

router.route("/doanhthu/thang")
    .get(pays.doanhthu);
module.exports = router;
