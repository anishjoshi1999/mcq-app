const express = require("express");
const router = express.Router();

const {
  getMCQByTopicAndSlug,
  getAllTopics,
} = require("../Controllers/topicController");
// Route to fetch all topics with name and slug
router.get("/show-all", getAllTopics);
// Route to fetch specific MCQ based on topic name and question slug
router.get("/:topicSlug/mcq/:questionSlug", getMCQByTopicAndSlug);
module.exports = router;
