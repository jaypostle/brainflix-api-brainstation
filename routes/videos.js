const express = require("express");
const router = express.Router();

const path = require("node:path");

const videosJSONFile = path.join(__dirname, "../data/videos.json");
const videos = require(videosJSONFile);

// Unique ID creator
const { getNewId, writeJSONFile } = require("../helper/helper");

/**
 * END POINTS FOR VIDEOS
 *
 * GET /videos
 * GET /videos/:id
 * POST /videos
 */

// Map and replace proper image urls
const videosWithUpdatedImages = videos.map((video) => {
  return { ...video, image: `http://localhost:8080/${video.image}` };
});

// GET /videos route that responds with an array of videos
router.get("/", (_req, res) => {
  // return all videos
  try {
    res.status(200).json(videosWithUpdatedImages);
  } catch (error) {
    console.log("Error retrieving the videos", error);
  }
});

// GET /videos/:id that respond with an object containing the details
router.get("/:id", (req, res) => {
  // return all videos
  try {
    const found = videos.find((video) => video.id === req.params.id);
    if (found) {
      const updatedLink = {
        ...found,
        // image: `http://localhost:8080/${image}`,
        image: `http://localhost:8080/${found.image}`,
      };
      res.status(200).json(updatedLink);
    } else {
      res
        .status(404)
        .json({ error: `Student with ID ${req.params.id} not found` });
    }
  } catch (error) {
    console.log("Error retrieving the videos", error);
  }
});

// POST /videos that will add a new video to the video list. Unique ID must be generated
router.post("/", (req, res) => {
  console.log(req.body);
  const { title, channel } = req.body;
  if (!title || !channel) {
    // bad request - need title and channel
    return res.status(400).json({
      error:
        "Please provide video title and channel for uploading a new video.",
    });
  }

  const newVideo = {
    // or use spread to duplicate
    id: getNewId(),
    title,
    channel,
    image: "/images/Upload-video-preview.jpg", // all uses the same image
    // description, // lorem ipsum
    views: 0,
    likes: 0,
    duration: "2:00", // make a function that generates a random time between 1 and 10 minutes
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: new Date().getTime(),
    comments: [],
  };

  // update json videos file with the new video
  videos.push(newVideo);
  writeJSONFile(videosJSONFile, videos);

  // respond to the client with new video and status code 201
  res.status(201).json(newVideo);
});

module.exports = router;
