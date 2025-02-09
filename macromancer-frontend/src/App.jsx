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

  /*Image and desc recieved, enter load, then display */
  return (
    <div>
      <UploadSection onAnalyze={handleAnalyze} />
    </div>
  );
};

export default App;