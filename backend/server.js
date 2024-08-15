const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const router = require("./routes/routing");
const connecting = require("./models/mongoose");
const port = process.env.PORT || 4000;
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173", // or '*' to allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(router);
connecting();
// Adding error handling
app.listen(port, (err) => {
  if (err) {
    return console.error(`Failed to start server on port ${port}:`, err);
  }
  console.log(`App is running on port ${port}`);
});
