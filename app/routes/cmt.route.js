const express = require("express");
const cmts = require("../controllers/cmt.controller");

const router = express.Router();

router.route("/comments").get(cmts.findByIdpd);
router.route("/").post(cmts.create).get(cmts.findAll);
router.route("/:id").delete(cmts.delete);

// router.route("/:id").get(cmts.findOne).put(cmts.update).delete(cmts.delete);
// router.route("/findByIdpd/:id").get(cmts.findByIdpd);

module.exports = router;
