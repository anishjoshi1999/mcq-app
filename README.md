# MCQ-App

This repository contains the frontend and backend code for the MCQ-App, which allows users to upload, manage, and retrieve multiple choice questions (MCQs) related to different topics. The backend is built with Node.js, Express, and MongoDB.

# MCQ-App Backend

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Upload MCQs](#upload-mcqs)
  - [Show All Topics](#show-all-topics)
  - [Get All MCQs By Topic](#get-all-mcqs-by-topic)
  - [Get Specific MCQ By Topic and Slug](#get-specific-mcq-by-topic-and-slug)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mcq-app.git
   cd mcq-app
   cd backend
   ```
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables in a `.env` file. See [Environment Variables](#environment-variables) for more information.

4. Start the server:

   ```bash
   npm run dev
   ```

## Usage

Once the server is running, you can interact with the API using tools like Postman or cURL. The server will be running on the port specified in the `.env` file.

## API Endpoints

### Upload MCQs

- **URL:** `/api/mcq/upload`
- **Method:** `POST`
- **Description:** Upload MCQs from a JSON file to the database and associate them with a topic.
- **Request Body:**
  ```json
  {
    "name": "C Language"
  }
  ```

### Show All Topics

- **URL:** `/api/mcq/show-all`
- **Method:** `GET`
- **Description:** Retrieve all topics with their names and slugs.

### Get All MCQs By Topic

- **URL:** `/api/mcq/:slug`
- **Method:** `GET`
- **Description:** Retrieve all MCQs based on the topic slug.
- **URL Parameters:**
  - `slug`: The slug of the topic.

### Get Specific MCQ By Topic and Slug

- **URL:** `/api/mcq/:topicSlug/mcq/:questionSlug`
- **Method:** `GET`
- **Description:** Retrieve a specific MCQ based on the topic slug and question slug.
- **URL Parameters:**
  - `topicSlug`: The slug of the topic.
  - `questionSlug`: The slug of the question.

## Project Structure

```bash
├── Controllers
│   └── mcqControllers.js
├── Data
│   └── c_language_mcqs.json
├── Models
│   ├── mcqSchema.js
│   ├── optionSchema.js
│   └── topicSchema.js
├── Routes
│   └── mcqRoute.js
├── .env
├── .gitignore
├── app.js
└── package.json
```

- **Controllers:** Contains the logic for handling requests and interacting with the database.
- **Data:** Contains JSON files with MCQ data.
- **Models:** Contains Mongoose schemas and models for MongoDB collections.
- **Routes:** Contains Express route definitions.

## Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```bash
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with the actual connection string for your MongoDB database.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
