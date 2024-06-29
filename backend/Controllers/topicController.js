const MCQ = require("../Models/mcqSchema");
const Topic = require("../Models/topicSchema");
// Controller function to fetch all the Topics saved in the Database
async function getAllTopics(req, res) {
  try {
    // Retrieve all topics from the database, including only 'name' and 'slug' fields
    const topics = await Topic.find({}, { name: 1, slug: 1, _id: 0 });

    // Respond with a JSON array of topics
    res.status(200).json(topics);
  } catch (error) {
    // Handle errors if fetching topics fails
    console.error("Error retrieving topics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Controller function to fetch specific MCQ based on topic name and question slug
async function getMCQByTopicAndSlug(req, res) {
  const { topicSlug, questionSlug } = req.params;

  try {
    // Find the topic based on the slug and populate MCQs
    const topic = await Topic.findOne({ slug: topicSlug }).populate({
      path: "mcqs",
      match: { slug: questionSlug },
    });

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    // Extract the MCQ from the topic and send as response
    const mcq = topic.mcqs.find((mcq) => mcq.slug === questionSlug);

    if (!mcq) {
      return res.status(404).json({ error: "MCQ not found" });
    }

    res.status(200).json(mcq);
  } catch (error) {
    console.error("Error retrieving MCQ by topic and slug:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
// Controller function to retrieve MCQs based on topic slug
async function getMCQsByTopic(req, res) {
  const slug = req.params.slug;

  try {
    // Find the topic based on the slug and populate MCQs
    const topic = await Topic.findOne({ slug: slug }).populate("mcqs");

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    // Respond with the found topic and its associated MCQs
    res.status(200).json(topic);
  } catch (error) {
    // Error handling
    console.error("Error retrieving MCQs by topic:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = { getMCQsByTopic, getAllTopics, getMCQByTopicAndSlug };
