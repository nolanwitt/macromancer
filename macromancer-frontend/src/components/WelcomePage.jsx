import React from "react";
import "../styles/WelcomePage.css";
import Skull from "./Skull";
import CrystalBall from "./CrystalBall";

const WelcomePage = () => {
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
<<<<<<< Updated upstream
            Height:
            <input type="number" placeholder="Enter height" />
          </label>
          <label>
            Weight:
            <input type="number" placeholder="Enter weight" />
=======
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
>>>>>>> Stashed changes
          </label>
          <label>
            Age:
            <input type="number" placeholder="Enter age" />
          </label>
        </div>

        {/* Crystal Ball Component */}
        <button className="crystal-ball-wrapper">
          <CrystalBall scale={0.5} />
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;