const express = require("express");
const posts = require("../controllers/post.controller");

const router = express.Router();

router.route("/").get(posts.findAll).post(posts.create).delete(posts.deleteAll);
router.route("/favorite").get(posts.findAllFavorite);

router.route("/:id").get(posts.findOne).put(posts.update).delete(posts.delete);
router.route("/loai/aaa").get(posts.findLoai);
router.route("/loai/bbb").get(posts.findLoaiT);
router.route("/loai/ccc").get(posts.findLoaiB);

module.exports = router;
