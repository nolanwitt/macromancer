import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UploadSection from "./components/UploadSection";
import ResultsPage from "./pages/ResultsPage";

const App = () => {
  const [result, setResult] = useState(null);

  const handleAnalyze = async (input) => {
    setResult({ calories: 250, carbs: 30, protein: 10, fats: 5 }); // Mock data
  };

  return (
    <Routes>
      <Route path="/" element={<UploadSection onAnalyze={handleAnalyze} />} />
      <Route path="/results" element={<ResultsPage result={result} />} />
    </Routes>
  );
};

export default App;
