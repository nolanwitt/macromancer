import { useState, useRef } from "react";

const UploadSection = ({ onAnalyze }) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      e.target.value = ""; // Reset input
    }
  };

  const handleExitCamera = () => {
    setShowCamera(false);
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const handleTakePhoto = () => {
    setShowCamera(true);
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  };

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      canvasRef.current.toBlob((blob) => {
        setImage(URL.createObjectURL(blob));
        setShowCamera(false);
        if (videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
      }, "image/png");
    }
  };

  const handleAnalyze = () => {
    if (!image || !description) {
      setError("⚠️ Please provide both an image and a description.");
      return;
    }
    setError(""); // Clear errors
    if (onAnalyze) {
      onAnalyze({ image, description }); // Send data to App.jsx
    }
  };

  return (
    <div className="body">
      <div className="container">
        <h1>Macromancer</h1>
        <p>Upload an image of your food to analyze macros</p>

        <div className="upload-section">
          <label className="upload-btn">
            <input 
              type="file" 
              style={{ display: "none" }} 
              onChange={handleImageChange} 
            />
            ➕
            <span>Upload Image</span>
          </label>

          <label className="upload-btn" onClick={handleTakePhoto}>
            📷
            <span>Take a Photo</span>
          </label>
        </div>

        {showCamera && (
          <div className="camera-section">
            <video ref={videoRef} autoPlay playsInline />
            <button className="capture-btn" onClick={capturePhoto}>Capture</button>
            <button className="exit-camera-btn" onClick={handleExitCamera} style={{ marginLeft: "20px" }}>Exit Camera</button>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          </div>
        )}

        {image && <img src={image} alt="Captured" style={{ width: "100px" }} />}

        <input 
          className="input" 
          placeholder="Type Here" 
          type="text" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="voltage-button">
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleAnalyze}>Analyze</button>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
