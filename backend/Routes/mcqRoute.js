const express = require("express");
const router = express.Router();

const {
  uploadMCQS,
  getAllMCQsByTopic,
  getAllTopics,
  getMCQByTopicAndSlug,
} = require("../Controllers/mcqControllers");
// Route to upload MCQs from JSON file to database and associate with topic
router.post("/upload", uploadMCQS);
// Route to fetch all topics with name and slug
router.get("/show-all", getAllTopics);
// Route to retrieve All MCQs based on topic name
router.get("/:slug", getAllMCQsByTopic);
// Route to fetch specific MCQ based on topic name and question slug
router.get("/:topicSlug/mcq/:questionSlug", getMCQByTopicAndSlug);
module.exports = router;
