const express = require("express");
const router = express.Router();

const Post = require("../models/posts");

router.get("/", (req, res) => {
  Post.findAll({ order: [["createdAt", "DESC"]] })
    .then((posts) => {
      res.render("home", {
        posts: posts.map((p) => {
          return {
            id: p.id,
            title: p.title,
            content: p.content,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
          };
        }),
      });
    })
    .catch((err) => {
      console.log("error get posts: ", err);
    });
});

router.get("/posts", (req, res) => {
  res.render("form");
});

router.post("/posts", (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.content,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/posts/:id", async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id } });
    res.send("Post deleted");
  } catch (err) {
    res.send("Error deleting post");
  }
});

module.exports = router;
