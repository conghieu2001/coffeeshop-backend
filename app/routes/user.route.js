const express = require("express");
const users = require("../controllers/user.controller");

const router = express.Router();

router.route("/").get(users.findAll).post(users.create).delete(users.deleteAll);
router.route("/login").post(users.loginAccount);

router.route("/:id").get(users.findOne).put(users.update).delete(users.delete);
router.route("/findbyemail/:id").get(users.findByEmail);

module.exports = router;
