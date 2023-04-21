const express = require("express");
const recruitments = require("../controllers/tuyendung.controller");

const router = express.Router();

router.route("/")
    .get(recruitments.findAll)
    .post(recruitments.create)
    .delete(recruitments.deleteAll);
    
router.route("/:id")
    .get(recruitments.findOne)
    .put(recruitments.update)
    .delete(recruitments.delete);


module.exports = router;