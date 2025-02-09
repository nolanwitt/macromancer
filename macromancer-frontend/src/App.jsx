import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UploadSection from "./components/UploadSection";
import Results from "./components/Results";
import LoadingScreen from "./components/LoadingScreen";
import WelcomePage from "./components/WelcomePage";
import "./styles/LoadingScreen.css";

const App = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  // State for user input data
  const [userData, setUserData] = useState({ height: "", weight: "", age: "" });

  // Function to update user data
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => {
      const newData = { ...prevData, [name]: value };
      console.log("Updated userData:", newData); // Debugging log
      return newData;
    });
  };

  const handleAnalyze = async ({ image, description }) => {
    console.log("Image received:", image);
    console.log("Description received:", description);
    console.log("User data:", userData); // Debugging log
  
    const formData = new FormData();
  
    // Convert image URL to file (handle both file upload & camera capture)
    const response = await fetch(image);
    const blob = await response.blob();
    formData.append("image", blob, "food_image.jpg");
    formData.append("description", description);
    
    // Append user data as JSON
    formData.append("userData", JSON.stringify(userData));
  
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/analyze-food", {
        method: "POST",
        body: formData
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch macro breakdown.");
      }
  
      const data = await res.json();
      setResult(data); // Update state to display macro results
      setTimeout(() => {
        setFadeOut(true);  // Trigger fade-out
      }, 300);
      
      setTimeout(() => {
        setLoading(false);
        setFadeOut(false);  // Reset for the next time
        navigate("/results", { state: { result: data } });
      }, 300);
    } catch (error) {
      console.error("Error analyzing food:", error);
    }
  };
  

  return (
    <div className="app-container">
      {loading ? (
        <div className={`loading-container ${fadeOut ? "fade-out" : "fade-in"}`}>
          <LoadingScreen />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<WelcomePage userData={userData} onUserDataChange={handleUserDataChange} />} />
          <Route path="/upload" element={<UploadSection onAnalyze={handleAnalyze} />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      )}
    </div>
  );
};

export default App;