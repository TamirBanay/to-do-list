const express = require("express");
const initializeDatabase = require('./config/databaseInit'); // Adjust the path as necessary
const userRoutes = require("./routes/userRoutes"); // Adjust the path as needed
const todoRoutes = require("./routes/todoRoutes"); // Adjust the path as needed

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//to Initialize database and models uncomment
initializeDatabase();

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Include the rest of your app's logic here
