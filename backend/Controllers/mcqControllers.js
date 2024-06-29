const MCQ = require("../Models/mcqSchema");
const Topic = require("../Models/topicSchema");

async function uploadMCQS(req, res) {
  try {
    // Step 1: Get a new topic entry with the inserted MCQs from Form
    // name = "C Language"
    const { name } = req.body;
    const mcqsData = require("../Data/c_language_mcqs.json"); // Load JSON data
    // Step 2: Insert all MCQs into the MCQ collection
    const insertedMCQs = await MCQ.insertMany(mcqsData);

    const topic = new Topic({
      name: name,
      mcqs: insertedMCQs.map((mcq) => mcq._id), // Assuming _id field is used for referencing MCQs
    });

    await topic.save(); // Save the topic to associate with MCQs

    res.status(200).json({
      message: "MCQs uploaded and associated with topic successfully",
    });
  } catch (error) {
    console.error("Error uploading and associating MCQs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Controller function to retrieve MCQs based on topic name
async function getMCQsByTopic(req, res) {
  const slug = req.params.slug;

  try {
    // Find the topic based on the name
    const topic = await Topic.findOne({ slug: slug }).populate("mcqs");

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    // Extract MCQs from the topic and send as response
    const mcqs = topic.mcqs;
    res.status(200).json(mcqs);
  } catch (error) {
    console.error("Error retrieving MCQs by topic:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = { uploadMCQS, getMCQsByTopic };
