const express = require("express");
const promos = require("../controllers/promo.controller");

const router = express.Router();

router.route("/").get(promos.findAll).post(promos.create);
router.route("/:id").delete(promos.delete);
router.route("/magiamgia").get(promos.findByMGG);
router.route("/freeship").get(promos.findByFS);
router.route("/findbynameupdate/:name").get(promos.usePromoCodeUpdate);
router.route("/findbyname/:name").get(promos.usePromoCode);


module.exports = router;