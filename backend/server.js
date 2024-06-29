const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
// Importing Routes
const mcqRoute = require("./Routes/mcqRoute");
const topicRoute = require("./Routes/topicRoute");

// Connection to Database

const MONGODB_URI = `${process.env.MONGODB_URI}`;

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to MCQ-App Backend");
});
// "/api/mcq*"
app.use("/api/mcq", mcqRoute);

// "/api/topic*"
app.use("/api/topic", topicRoute);
