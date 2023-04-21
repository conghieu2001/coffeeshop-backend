const express = require("express");
const stores = require("../controllers/store.controller");

const router = express.Router();

router.route("/")
    .get(stores.findAll)
    .post(stores.create)
    .delete(stores.deleteAll);
    
router.route("/:id")
    .get(stores.findOne)
    .put(stores.update)
    .delete(stores.delete);


module.exports = router;