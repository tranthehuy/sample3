const express = require("express");
const _ = require("lodash");

const Post = require("../models/Post");

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

router.get("/get-chapter-detail", async (req, res) => {
  try {
    const { postSlug, chapterSlug } = req.query;
    const chapter = await Chapter.getBySlug({
      postSlug,
      chapterSlug,
      userId: req.user && req.user.id,
      isAdmin: req.user && req.user.isAdmin,
    });
    res.json(chapter);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get("/get-table-of-contents", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.query.slug }, "id");
    if (!post) {
      throw new Error("Not found");
    }

    const chapters = await Chapter.find(
      { postId: post.id, order: { $gt: 1 } },
      "sections title slug"
    ).sort({ order: 1 });

    res.json(chapters);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get("/get-post-reviews", async (req, res) => {
  try {
    const reviewDoc = await Review.findOne(
      { postSlug: req.query.slug },
      "reviews"
    ).lean();
    const reviews = _.sortBy(reviewDoc.reviews, "order");
    res.json(reviews);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get("/get-tutorials", async (req, res) => {
  try {
    const tutorialDoc = await Tutorial.findOne(
      { postSlug: req.query.slug },
      "tutorials"
    ).lean();
    const tutorials = _.sortBy(tutorialDoc.tutorials, "order");
    res.json(tutorials);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.post("/subscribe-to-tutorials", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.json({ error: "Email is required" });
    return;
  }

  try {
    await subscribe({ email, listName: "tutorials" });
    res.json({ subscribed: 1 });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

module.exports = router;
