const mongoose = require("mongoose");
const optionSchema = require("./optionSchema");

const mcqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  image: {
    type: String, // This can be optional, assuming it's a URL or file path
  },
  options: {
    type: [optionSchema], // Using the optionSchema imported from optionSchema.js
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
  },
});

const MCQ = mongoose.model("MCQ", mcqSchema);

module.exports = MCQ;
