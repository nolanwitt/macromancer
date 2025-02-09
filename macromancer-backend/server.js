/**
 * Configuring server.js for Image Processing
 * @author Rameez Malik
 * 
 * This script ...
 * 
 * 1. Sets up an Express server
 * 2. Accepts image uploads via Multer
 * 3. Converts the image to base64
 * 4. Sends the image to OpenAIs GPT-4o
 * 5. Returns the macro breakdown to the frontend
 * 
 */
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Configure Multer for image uploads (stores image in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle food image analysis
app.post("/analyze-food", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Convert image to Base64 format
    const base64Image = req.file.buffer.toString("base64");

    // OpenAI GPT-4o Vision API Call
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an AI that analyzes food images and provides macronutrient estimates including calories, protein, carbs, and fats."
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Analyze this food item and provide a macro breakdown." },
              { type: "image_url", image_url: `data:image/jpeg;base64,${base64Image}` }
            ]
          }
        ],
        max_tokens: 300
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // Extracting response and sending it to frontend
    const macroData = response.data.choices[0].message.content;
    res.json({ macro_breakdown: macroData });

  } catch (error) {
    console.error("Error analyzing food image:", error.response?.data || error.message);
    res.status(500).json({ error: "Error processing image analysis" });
  }
});

// ✅ FIXED: This is the only place where the server starts
const server = app.listen(0, () => {
    const PORT = server.address().port;
    console.log(`Server running on port ${PORT}`);
});

// Verify API Key is being read correctly - DEBUGGING
console.log("OpenAI API Key:", process.env.OPENAI_API_KEY ? "Loaded ✅" : "Not Found ❌");

