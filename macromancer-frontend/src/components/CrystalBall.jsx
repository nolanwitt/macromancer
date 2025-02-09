import React, { useState } from 'react';

const CrystalBallButton = ({ scale = 1 }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true); // Activate hover effect
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Deactivate hover effect
  };

  const styles = {
    container: {
      position: 'relative',
      transform: `scale(${scale})`,
      transformOrigin: 'center center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer', // Make it look interactive
    },
    crystalBall: {
      position: 'relative',
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, #8a2be2, #4b0082)',
      boxShadow: isHovered
        ? '0 0 50px #8a2be2, 0 0 100px #8a2be2, 0 0 150px #8a2be2'
        : 'none',
      overflow: 'hidden',
      zIndex: 2,
      transition: 'box-shadow 0.3s ease-in-out',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    crystalBallBefore: {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '100px',
      height: '100px',
      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent)',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      animation: 'swirl 4s linear infinite',
    },
    crystalBallAfter: {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '120px',
      height: '120px',
      background: 'conic-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5))',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      animation: 'swirl 4s linear infinite',
    },
    stand: {
      position: 'relative',
      width: '120px',
      height: '20px',
      background: '#8b4513',
      boxShadow: '0 0 20px rgba(139, 69, 19, 0.8)',
      zIndex: 1,
      marginTop: '-10px',
    },
    standBefore: {
      content: '""',
      position: 'absolute',
      top: '-50px',
      left: '50%',
      width: '80px',
      height: '80px',
      background: '#8b4513',
      transform: 'translateX(-50%)',
      borderRadius: '10px',
      boxShadow: '0 0 20px rgba(139, 69, 19, 0.8)',
    },
    star: {
      position: 'absolute',
      width: '5px',
      height: '5px',
      background: 'white',
      borderRadius: '50%',
      boxShadow: '0 0 5px white, 0 0 10px white',
      animation: 'twinkle 2s infinite ease-in-out',
    },
    star1: {
      top: '30%',
      left: '20%',
      animationDelay: '0s',
    },
    star2: {
      top: '50%',
      left: '70%',
      animationDelay: '0.5s',
    },
    star3: {
      top: '70%',
      left: '40%',
      animationDelay: '1s',
    },
    star4: {
      top: '10%',
      left: '60%',
      animationDelay: '1.5s',
    },
    text: {
      position: 'absolute',
      color: 'rgba(138, 43, 226, 0.7)',
      fontSize: '24px',
      fontWeight: 'bold',
      textShadow: '0 0 10px rgba(60, 60, 60, 0.8)',
      zIndex: 3, // Ensure the text is above other elements
    },
  };

  return (
    <div
      style={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={styles.crystalBall}>
        <div style={styles.text}>Ask</div>
        <div style={{ ...styles.star, ...styles.star1 }}></div>
        <div style={{ ...styles.star, ...styles.star2 }}></div>
        <div style={{ ...styles.star, ...styles.star3 }}></div>
        <div style={{ ...styles.star, ...styles.star4 }}></div>
        <div style={styles.crystalBallBefore}></div>
        <div style={styles.crystalBallAfter}></div>
      </div>
      <div style={styles.stand}>
        <div style={styles.standBefore}></div>
      </div>
    </div>
  );
};

export default CrystalBallButton;