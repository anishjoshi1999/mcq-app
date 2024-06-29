const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  label: {
    type: String,
    enum: ["a", "b", "c", "d"],
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

module.exports = optionSchema;
