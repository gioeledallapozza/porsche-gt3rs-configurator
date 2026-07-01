import React from 'react';
import { useNavigate } from 'react-router-dom';
// TO IMPORT CSS file

const Hero: React.FC = () => {
  const navigate = useNavigate(); // Hook to integrate browser history (API) and the router navigation.

  const handleConfigureClick = () => {
    // Navigate to the configurator for the GT3 RS model. 
    // This is a hardcoded example; in production you might want to dynamically determine the vehicleId based on user selection or other logic.
    navigate('/configurator/gt3rs');
  };

  return (
    <div style={{ padding: '4rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Porsche 911 GT3 RS</h1>
      <p>Aerodynamics meets surgical precision.</p>
      
      {/* 
      DOM pure, optimized for TTI.
      */}
      <button 
        onClick={handleConfigureClick}
        style={{
          marginTop: '2rem',
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
        Configure
      </button>
    </div>
  );
};

export default Hero;