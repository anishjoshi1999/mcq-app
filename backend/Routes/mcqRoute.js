const express = require("express");
const router = express.Router();

const {
  uploadMCQS,
  getAllMCQsByTopic,
  getAllTopics,
  getMCQByTopicAndSlug,
  deleteAllMCQsByTopic,
  appendMCQsToTopic,
  updateSpecificMCQ,
  deleteSpecificMCQ,
} = require("../Controllers/mcqControllers");

// Route to upload MCQs from JSON file to database and associate with topic
router.post("/upload", uploadMCQS);

// Route to fetch all topics with name and slug
router.get("/topics", getAllTopics);

// Route to retrieve all MCQs based on topic slug
router.get("/topics/:topicSlug", getAllMCQsByTopic);

// Route to append MCQs to an existing topic
router.post("/topics/:topicSlug", appendMCQsToTopic);

// Route to delete all MCQs based on topic slug
router.delete("/topics/:topicSlug", deleteAllMCQsByTopic);

// Route to fetch specific MCQ based on topic slug and question slug
router.get("/topics/:topicSlug/:questionSlug", getMCQByTopicAndSlug);

// Route to update a specific MCQ based on topic slug and question slug
router.put("/topics/:topicSlug/:questionSlug", updateSpecificMCQ);

// Route to delete a specific MCQ based on topic slug and question slug
router.delete("/topics/:topicSlug/:questionSlug", deleteSpecificMCQ);

module.exports = router;
