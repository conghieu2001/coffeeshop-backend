const express = require("express");
const items = require("../controllers/item.controller");

const router = express.Router();

router.route("/ItemDetail/:id")
    .get(items.findOne)
    .put(items.update)
    .delete(items.delete);
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
    
router.route("/loaiItem")
    .post(items.findByLoai);
// router.route("/delete/:id")
//     .put(items.delete);

router.route("/loai/coffee").get(items.findAllCoffee);
router.route("/loai/hitea").get(items.findAllHiTea);
router.route("/loai/tea").get(items.findAllTea);
router.route("/find/byname/:name").get(items.findName);


module.exports = router;