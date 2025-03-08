const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const serverless = require("serverless-http");

const app = express();
app.use(cors());

const API_KEY = process.env.JOBS_API_KEY;

app.get("/api/jobs", async (req, res) => {
  try {
    const url =
      "https://www.themuse.com/api/public/jobs?page=1&category=Data%20and%20Analytics&category=Software%20Engineer&category=Design%20and%20UX&category=UX&level=Entry%20Level&level=Mid%20Level&level=Senior%20Level&level=Internship";
    const response = await fetch(url, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched Jobs:", data);

    res.json(data.results || []);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch job listings" });
  }
});

module.exports = app;
module.exports.handler = serverless(app);
