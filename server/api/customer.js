const express = require("express");
const _ = require("lodash");

// const Post = require("../models/Post");

const router = express.Router();

router.use((req, res, next) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
});

router.get("/my-posts", async (req, res) => {
  try {
    const { postIds = [] } = req.user;

    res.json({ posts: [] });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

module.exports = router;
