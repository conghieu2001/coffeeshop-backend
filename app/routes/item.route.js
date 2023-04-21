const express = require("express");
const items = require("../controllers/item.controller");

const router = express.Router();

router.route("/")
    .get(items.findAll)
    .post(items.create);
    // .delete(items.deleteAll);

router.route("/deleted")
    .get(items.findAllDeleted);

router.route("/restore/:id")
    .put(items.restore);

router.route("/bestsale")
    .get(items.findBestsale);
    
router.route("/:id")
    .get(items.findOne)
    .put(items.update)
    .delete(items.delete);
// router.route("/delete/:id")
//     .put(items.delete);


module.exports = router;