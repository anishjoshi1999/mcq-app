const express = require("express");
const router = express.Router();

const { uploadMCQS, getMCQsByTopic } = require("../Controllers/mcqControllers");
// Route to upload MCQs from JSON file to database and associate with topic
router.post("/mcq/upload", uploadMCQS);
// Route to retrieve MCQs based on topic name
router.get("/mcq/:slug", getMCQsByTopic);
module.exports = router;
