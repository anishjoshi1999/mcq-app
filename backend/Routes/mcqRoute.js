const express = require("express");
const router = express.Router();

const { uploadMCQS } = require("../Controllers/mcqControllers");
// Route to upload MCQs from JSON file to database and associate with topic
router.post("/upload", uploadMCQS);

module.exports = router;
