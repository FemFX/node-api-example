const express = require("express");
const router = require("express").Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.json(post);
});
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const post = new Post({ title, description });
  await post
    .save()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndRemove({ _id: id })
    .then(() => res.json({ message: "Post removed" }))
    .catch((err) => console.log(err));
});
router.put("/:id", async (req, res) => {
  const { title, description } = req.body;
  const _id = req.params.id;
  const newPost = { title, description };
  await Post.findByIdAndUpdate(_id, newPost)
    .then(() => res.json("Post updated"))
    .catch((err) => console.log(err));
});

module.exports = router;
