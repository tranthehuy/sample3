const express = require("express");

const Post = require("../models/Post");
const User = require("../models/User");

const logger = require("../logs");

const router = express.Router();

router.use((req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
});

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.list({ userId: req.user.id });
    res.json(posts);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.post("/posts/add", async (req, res) => {
  try {
    const post = await Post.add(
      Object.assign({ userId: req.user.id }, req.body)
    );
    res.json(post);
  } catch (err) {
    logger.error(err);
    res.json({ error: err.message || err.toString() });
  }
});

router.post("/posts/edit", async (req, res) => {
  try {
    const editedPost = await Post.edit(req.body);
    res.json(editedPost);
  } catch (err) {
    logger.error(err);
    res.json({ error: err.message || err.toString() });
  }
});

router.get("/posts/detail/:slug", async (req, res) => {
  try {
    const post = await Post.getBySlug({ slug: req.params.slug });
    res.json(post);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.post("/users/search", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    res.json({ error: "Empty query" });
    return;
  }

  try {
    const users = await User.search(query);
    res.json({ users });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

module.exports = router;
