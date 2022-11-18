// First Line is always dotenv
require("dotenv").config();

const express = require("express");

const cors = require("cors");
const path = require("node:path");

// initialize express server instance
const app = express();
app.use(cors());

// const of routes
const videoRouter = require("./routes/videos");

// const of loggers

// custom logger middleware
const logger = require("./middlewares/logger");

/**
 * MiddleWare
 */

app.use(express.json());

// serving static assets out of public file
app.use(express.static(path.join(__dirname, "public")));

// use logger middleware
app.use(logger); // next()

app.use("/api/videos", videoRouter);

app.get("/", (_req, res) => {
  // serve the index.html file from the public folder
  // create the path to index.html file using path module
  // express-intro-basic/public/index.html
  res.sendFile(path.join(__dirname, "public", "sprint-2-api-documentation.md"));
});

// Listen for requests from client
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
