require("dotenv").config();
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // ✅ Allow frontend access
app.use(express.json());

// Configure Multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle food image analysis
app.post("/analyze-food", upload.single("image"), async (req, res) => {
    try {
      // ✅ Ensure an image was uploaded
      if (!req.file) {
        return res.status(400).json({ error: "No image uploaded" });
      }
  
      // ✅ Convert image to base64
      const base64Image = req.file.buffer.toString("base64");
  
      // ✅ Ensure a description is provided
      const userDescription = req.body.description || "Unknown food item";
  
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            { role: "system", content: "You are an AI that analyzes food images and provides macronutrient estimates." },
            { role: "user", content: [
                { type: "text", text: `Analyze this food item: ${req.body.description}. Provide a detailed macro breakdown.` },
                { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }  // ✅ FIXED: Image URL must be an object
            ]}
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
      
      res.json({ macro_breakdown: response.data.choices[0].message.content });
  
    } catch (error) {
      console.error("Error analyzing food image:", error.response?.data || error.message);
      res.status(500).json({ error: "Error processing image analysis" });
    }
  });
  

const PORT = 3000;  // ✅ Fixed backend port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY ? "Loaded ✅" : "Not Found ❌");
