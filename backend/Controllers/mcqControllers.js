const MCQ = require("../Models/mcqSchema");
const Topic = require("../Models/topicSchema");
const slugify = require("slugify");

async function uploadMCQS(req, res) {
  try {
    // Step 1: Get the topic name from the request body
    const { name } = req.body;

    // Step 2: Load MCQs data from JSON file
    const mcqsData = require("../Data/c_language_mcqs.json");

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

module.exports = { uploadMCQS };
