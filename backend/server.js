// import { expoConfig } from "expo-constants";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors());
app.use(express.json());

const API_URL = process.env.JOBS_API_URL;
const API_KEY = process.env.JOBS_API_KEY;


console.log("API_URL:", API_URL);

app.get("/api/jobs", async (req, res) => {
    try {
      const { page = 1, category = "", level = "", company = "" } = req.query;
      
      const apiUrl = `${API_URL}?page=${page}`;
      
      console.log("Fetching jobs from:", apiUrl); 
  
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("API Response:", data); 
  
      res.json(data.results || []); 
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ error: "Failed to fetch job listings" });
    }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
