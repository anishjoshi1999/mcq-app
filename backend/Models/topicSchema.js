const mongoose = require("mongoose");
const slugify = require("slugify");

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    default: function () {
      return slugify(this.name, { lower: true });
    },
  },
  mcqs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MCQ",
    },
  ],
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
