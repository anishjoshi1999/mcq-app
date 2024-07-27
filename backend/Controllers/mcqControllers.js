const MCQ = require("../Models/mcqSchema");
const Topic = require("../Models/topicSchema");
const slugify = require("slugify");

async function uploadMCQS(req, res) {
  try {
    // Step 1: Get the topic name from the request body
    const { name } = req.body;

    // Step 2: Load MCQs data from JSON file
    const mcqsData = require("../Data/computer_network_mcq.json");

    // Step 3: Process each MCQ and generate slugs
    const processedMCQs = mcqsData.map((mcq) => ({
      question: mcq.question,
      slug: slugify(mcq.question, { lower: true, strict: true }), // Generate slug for the question
      image: mcq.image,
      options: mcq.options,
      correctAnswer: mcq.correctAnswer,
      explanation: mcq.explanation,
    }));

    // Step 4: Insert all processed MCQs into the MCQ collection
    const insertedMCQs = await MCQ.insertMany(processedMCQs);

    // Step 5: Create a new topic entry with the inserted MCQs' IDs
    const topic = new Topic({
      name: name,
      mcqs: insertedMCQs.map((mcq) => mcq._id), // Assuming _id field is used for referencing MCQs
    });

    // Step 6: Save the topic to associate with MCQs
    await topic.save();

    // Step 7: Respond with success message
    res.status(200).json({
      message: "MCQs uploaded and associated with topic successfully",
    });
  } catch (error) {
    // Error handling
    console.error("Error uploading and associating MCQs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
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
async function getAllMCQsByTopic(req, res) {
  const slug = req.params.topicSlug;

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

// Controller function to delete all MCQs based on topic slug
async function deleteAllMCQsByTopic(req, res) {
  const slug = req.params.topicSlug;

  try {
    // Find the topic based on the slug
    const topic = await Topic.findOne({ slug });

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    // Delete all MCQs associated with the topic
    await MCQ.deleteMany({ _id: { $in: topic.mcqs } });

    // Clear the MCQs array in the topic
    topic.mcqs = [];
    await topic.save();

    res
      .status(200)
      .json({ message: "All MCQs for the topic have been deleted" });
  } catch (error) {
    console.error("Error deleting MCQs by topic:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
// Controller function to append more MCQs to an existing topic
async function appendMCQsToTopic(req, res) {
  const slug = req.params.topicSlug;
  const mcqsData = req.body.mcqs; // Assuming MCQs data is sent in the request body

  try {
    // Find the topic based on the slug
    const topic = await Topic.findOne({ slug });

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    // Process each new MCQ and generate slugs
    const processedMCQs = mcqsData.map((mcq) => ({
      question: mcq.question,
      slug: slugify(mcq.question, { lower: true, strict: true }), // Generate slug for the question
      image: mcq.image,
      options: mcq.options,
      correctAnswer: mcq.correctAnswer,
      explanation: mcq.explanation,
    }));

    // Insert the new MCQs into the MCQ collection
    const insertedMCQs = await MCQ.insertMany(processedMCQs);

    // Append the new MCQs' IDs to the topic's mcqs array
    topic.mcqs.push(...insertedMCQs.map((mcq) => mcq._id));

    // Save the updated topic
    await topic.save();

    res.status(200).json({
      message: "MCQs appended to the topic successfully",
      appendedMCQs: insertedMCQs,
    });
  } catch (error) {
    console.error("Error appending MCQs to topic:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
// Controller function to update a specific MCQ
async function updateSpecificMCQ(req, res) {
  const { topicSlug, questionSlug } = req.params;
  const updateData = req.body;

  try {
    const topic = await Topic.findOne({ slug: topicSlug }).populate({
      path: "mcqs",
      match: { slug: questionSlug },
    });

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    const mcq = topic.mcqs.find((mcq) => mcq.slug === questionSlug);

    if (!mcq) {
      return res.status(404).json({ error: "MCQ not found" });
    }

    Object.assign(mcq, updateData);
    await mcq.save();

    res.status(200).json({ message: "MCQ updated successfully", mcq });
  } catch (error) {
    console.error("Error updating MCQ:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Controller function to delete a specific MCQ
async function deleteSpecificMCQ(req, res) {
  const { topicSlug, questionSlug } = req.params;

  try {
    const topic = await Topic.findOne({ slug: topicSlug }).populate({
      path: "mcqs",
      match: { slug: questionSlug },
    });

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    const mcqIndex = topic.mcqs.findIndex((mcq) => mcq.slug === questionSlug);

    if (mcqIndex === -1) {
      return res.status(404).json({ error: "MCQ not found" });
    }

    const mcqId = topic.mcqs[mcqIndex]._id;
    topic.mcqs.splice(mcqIndex, 1);
    await topic.save();
    await MCQ.findByIdAndDelete(mcqId);

    res.status(200).json({ message: "MCQ deleted successfully" });
  } catch (error) {
    console.error("Error deleting MCQ:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = {
  uploadMCQS,
  getAllMCQsByTopic,
  getAllTopics,
  getMCQByTopicAndSlug,
  deleteAllMCQsByTopic,
  appendMCQsToTopic,
  updateSpecificMCQ,
  deleteSpecificMCQ,
};
