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

      // ✅ Extract user data
      const userData = req.body.userData ? JSON.parse(req.body.userData) : null;
      console.log("Received user data:", userData);

      // ✅ Ensure a description is provided
      const userDescription = req.body.description || "Unknown food item";

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            { role: "system", content: 
                "Act as a nutritionist and data scientist specializing in food analysis. Given: An image of a meal (optionally accompanied by a textual description)."
                + "A person’s height (in inches), weight (in pounds), and age (in years). Use computer vision techniques and nutritional knowledge to estimate: "
                + "Total caloric value of the meal. Macronutrient breakdown (protein, carbohydrates, and fats). Additional Calculations:"
                + "Calculate the person's Total Daily Energy Expenditure (TDEE) using the sex-neutral Mifflin-St Jeor equation, without any activity level adjustment."
                + "Determine the percentage of their daily intake that this meal represents for: Calories, Carbohydrates, Protein, Fat"
                + "For daily macronutrient intake targets, use the standard dietary guidelines:"
                + "Carbohydrates: ~50% of total daily calories."
                + "Fats: ~30% of total daily calories."
                + "Protein: ~20% of total daily calories."
                + "Output Requirements:"
                + "Return results in a JSON file named results.json with the exact key names below (do not modify these names):"
                + "{"
                + "  'calories': OUTPUT,"
                + "  'carbs': OUTPUT,"
                + "  'protein': OUTPUT,"
                + "  'fat': OUTPUT,"
                + "  'calories-percent': OUTPUT,"
                + "  'carbs-percent': OUTPUT,"
                + "  'protein-percent': OUTPUT,"
                + "  'fat-percent': OUTPUT"
                + "}"
                + "The JSON should be structured and formatted for seamless integration into applications that analyze and display nutritional data."
                + "Ignore margin of error or confidence levels—only provide the direct estimations required in the JSON output."
              },
            { role: "user", content: [
                { type: "text", text: `Analyze this food item: ${req.body.description}. Provide a detailed macro breakdown. 
                  User details: Height: ${userData?.height}, Weight: ${userData?.weight}, Age: ${userData?.age}` },
                { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }  
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