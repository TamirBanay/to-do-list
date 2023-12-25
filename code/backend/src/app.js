const express = require("express");
const initializeDatabase = require("./config/databaseInit"); // Adjust the path as needed

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize database and models
initializeDatabase();

// Define routes here or import them

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Include the rest of your app's logic here
