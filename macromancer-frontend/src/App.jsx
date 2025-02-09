import { useState } from "react";
import UploadSection from "./components/UploadSection";

const App = () => {
  const [result, setResult] = useState(null);

  // Function to handle the data received from UploadSection
  const handleAnalyze = ({ image, description }) => {
    console.log("Image received:", image);
    console.log("Description received:", description);

    // For now, just log the data and set it in state
    setResult({ image, description });
  };

  return (
    <div>
      <UploadSection onAnalyze={handleAnalyze} />
      {result && (
        <div>
          <h2>Received Data:</h2>
          <p>Description: {result.description}</p>
          <img
            src={result.image}
            alt="Uploaded"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default App;