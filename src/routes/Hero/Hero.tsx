import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const navigate = useNavigate(); // Hook to integrate browser history (API) and the router navigation.

  const handleConfigureClick = () => {
    // Navigate to the configurator for the GT3 RS model. 
    // This is a hardcoded example; in production you might want to dynamically determine the vehicleId based on user selection or other logic.
    navigate('/configurator/gt3rs');
  };

  return (
    <div className={styles.heroContainer}>
      <video 
        className={styles.videoBackground} 
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/videos/hero-bg.webm" type="video/webm" />
      </video>

      <div className={styles.gradientOverlay} />

      <div className={styles.content}>
          <h1 className={styles.title}>Porsche 911 GT3 RS</h1>
          <p className={styles.subtitle}>Aerodynamics meets surgical precision.</p>

        <button 
            onClick={handleConfigureClick}
            className={styles.ctaButton}
          >
            Configure
          </button>
      </div>

      {/* Author of background video */}
      <a 
        href="https://www.youtube.com/@lennartraw" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.attribution}
      >
        Cinematics by LR Media
      </a>
    </div>
  );
};

export default Hero;