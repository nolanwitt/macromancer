import { useState } from "react";

const UploadSection = ({ onAnalyze }) => {
  const [input, setInput] = useState("");

  return (
    <div className="container">
      <h1>Macromancer</h1>
      <p>Upload an image of your food to analyze macros</p>

      <div className="upload-section">
        <label className="upload-btn">
          <input type="file" style={{ display: "none" }} />
          ➕
          <span>Upload Image</span>
        </label>

        <label className="upload-btn">
          📷
          <span>Take a Photo</span>
        </label>
      </div>

      <input
        type="text"
        placeholder="Type here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={() => onAnalyze(input)}>Analyze</button>
      <p style={{ fontSize: "12px", color: "gray", marginTop: "10px" }}>
        ⚠ Ensure the image is clear for best results
      </p>
    </div>
  );
};

export default UploadSection;
