import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WelcomePage.css";
import Skull from "./Skull";
import CrystalBall from "./CrystalBall";

const WelcomePage = ({ userData, onUserDataChange }) => {
  const navigate = useNavigate();

  // Function to navigate to UploadSection
  const handleNavigation = () => {
    navigate("/upload");
  };

  return (
    <div className="welcome-container">
      <div className="content">
        <h1 className="welcome-title">Welcome to Macromancer!</h1>

        {/* Skull Component */}
        <div className="skull-wrapper">
          <Skull scale={0.4} />
        </div>

        {/* Input Fields */}
        <div className="input-group">
          <label>
            Height (in):
            <input
              type="number"
              name="height"
              value={userData.height}
              onChange={onUserDataChange}
              placeholder="Enter height"
            />
          </label>
          <label>
            Weight (lbs):
            <input
              type="number"
              name="weight"
              value={userData.weight}
              onChange={onUserDataChange}
              placeholder="Enter weight"
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={userData.age}
              onChange={onUserDataChange}
              placeholder="Enter age"
            />
          </label>
        </div>

        {/* Crystal Ball Button (Navigates to UploadSection) */}
        <button className="crystal-ball-wrapper" onClick={handleNavigation}>
          <CrystalBall scale={0.5} />
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
