const express = require("express");
const _ = require("lodash");

const Post = require("../models/Post");
const Comment = require("../models/Comment");

const router = express.Router();

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.list();
    res.json(posts);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get("/posts/:slug", async (req, res) => {
  try {
    const post = await Post.getBySlug({ slug: req.params.slug });
    res.json(post);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get("/posts/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.list({ postId: req.params.id });
    res.json(comments);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

module.exports = router;
