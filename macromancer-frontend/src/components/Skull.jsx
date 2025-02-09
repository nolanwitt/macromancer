import React from 'react';

const Skull = ({ scale = 1 }) => {
  const styles = {
    container: {
      position: 'relative',
      transform: `scale(${scale})`,
      transformOrigin: 'center center',
      filter: 'drop-shadow(0px 0px 30px rgba(138,43,226,0.7))',
    },
    skullBody: {
      width: '400px',
      height: '325px',
      backgroundColor: '#121212',
      position: 'absolute',
      bottom: '-275px',
      left: '50%',
      transform: 'translateX(-50%)',
      borderRadius: '120px 120px 0 0',
      zIndex: 0,
      boxShadow: '0px 0px 20px rgba(138,43,226,0.7)',
    },
    skullTop: {
      width: '153px',
      height: '40px',
      backgroundColor: 'white',
      borderRadius: '20%',
      position: 'absolute',
      bottom: '78%',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 3,
      border: '2px solid #c0c0c0',
    },
    skullHat: {
      width: '150px',
      height: '120px',
      backgroundColor: 'white',
      borderRadius: '20% 20% 0% 0%',
      position: 'absolute',
      bottom: 'calc(75% + 40px)',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 3,
      border: '2px solid #c0c0c0',
    },
    skullHatBefore: {
      content: '""',
      position: 'absolute',
      width: '2px',
      height: '80%',
      backgroundColor: '#c0c0c0',
      top: '10%',
      left: '25%',
    },
    skullHatAfter: {
      content: '""',
      position: 'absolute',
      width: '2px',
      height: '80%',
      backgroundColor: '#c0c0c0',
      top: '10%',
      left: '75%',
    },
    skull: {
      width: '150px',
      height: '120px',
      backgroundColor: '#e0e0e0',
      borderRadius: '20%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: 2,
      boxShadow: '0 0 20px rgba(138,43,226,0.7)',
    },
    eye: {
      width: '55px',
      height: '45px',
      backgroundColor: 'black',
      borderRadius: '50%',
      position: 'absolute',
      top: '35px',
      boxShadow: 'inset 0px 15px 25px rgba(138,43,226,0.7)',
    },
    eyeLeft: {
      left: '12px',
      transform: 'rotate(30deg)',
    },
    eyeRight: {
      right: '12px',
      transform: 'rotate(330deg)',
    },
    nose: {
      width: '26px',
      height: '38px',
      backgroundColor: 'black',
      position: 'absolute',
      top: '70px',
      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
    },
    upperJaw: {
      width: '90px',
      height: '40px',
      backgroundColor: '#e0e0e0',
      borderRadius: '0 0 20px 20px',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
      bottom: '-20px',
    },
    lowerJaw: {
      width: '75px',
      height: '45px',
      backgroundColor: '#e0e0e0',
      borderRadius: '10px 10px 20px 20px',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      top: '175px',
      zIndex: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    teeth: {
      display: 'flex',
      gap: '4px',
      position: 'relative',
    },
    upperTeeth: {
      top: '20px',
    },
    lowerTeeth: {
      bottom: '28px',
    },
    upperTooth: {
      width: '14px',
      height: '18px',
      backgroundColor: 'white',
      borderRadius: '0 0 5px 5px',
    },
    lowerTooth: {
      width: '14px',
      height: '18px',
      backgroundColor: 'white',
      borderRadius: '5px 5px 0 0',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.skullBody}></div>
      <div style={styles.skullHat}>
        <div style={styles.skullHatBefore}></div>
        <div style={styles.skullHatAfter}></div>
      </div>
      <div style={styles.skullTop}></div>
      <div style={styles.skull}>
        <div style={{ ...styles.eye, ...styles.eyeLeft }}></div>
        <div style={{ ...styles.eye, ...styles.eyeRight }}></div>
        <div style={styles.nose}></div>
        <div style={styles.upperJaw}>
          <div style={{ ...styles.teeth, ...styles.upperTeeth }}>
            <div style={styles.upperTooth}></div>
            <div style={styles.upperTooth}></div>
            <div style={styles.upperTooth}></div>
            <div style={styles.upperTooth}></div>
          </div>
        </div>
      </div>
      <div style={styles.lowerJaw}>
        <div style={{ ...styles.teeth, ...styles.lowerTeeth }}>
          <div style={styles.lowerTooth}></div>
          <div style={styles.lowerTooth}></div>
          <div style={styles.lowerTooth}></div>
          <div style={styles.lowerTooth}></div>
        </div>
      </div>
    </div>
  );
};

export default Skull;