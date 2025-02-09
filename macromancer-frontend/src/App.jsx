import { useState } from "react";
import UploadSection from "./components/UploadSection";

const App = () => {
  const [result, setResult] = useState(null);

  const handleAnalyze = async ({ image, description }) => {
    console.log("Image received:", image);
    console.log("Description received:", description);

    const formData = new FormData();

    // Convert image URL to file (handle both file upload & camera capture)
    const response = await fetch(image);
    const blob = await response.blob();
    formData.append("image", blob, "food_image.jpg");
    formData.append("description", description);

    try {
      const res = await fetch("http://localhost:3000/analyze-food", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Failed to fetch macro breakdown.");
      }

      const data = await res.json();
      console.log("Macro Breakdown:", data);
      setResult(data); // Update state to display macro results
    } catch (error) {
      console.error("Error analyzing food:", error);
    }
  };

  return (
    <div>
      <UploadSection onAnalyze={handleAnalyze} />
      {result && (
        <div className="results">
          <h2>Macro Breakdown</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
