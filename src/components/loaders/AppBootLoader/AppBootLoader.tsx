import React from 'react';
import styles from './AppBootLoader.module.css';
import { useParams } from 'react-router-dom';

const AppBootLoader: React.FC = () => {

  const { vehicleId } = useParams<{ vehicleId: string }>();
  
  // Format the ID, fallback to 'VEHICLE' if not present
  const displayName = vehicleId ? vehicleId.toUpperCase() : 'VEHICLE';

  return (
    <div className={styles.boot} role="status" aria-live="polite">
      <div className={styles.content}>
        <span className={styles.mark}>{displayName}</span>
        <div className={styles.indeterminateTrack}>
          <div className={styles.indeterminateBar} />
        </div>
        <p className={styles.label}>Initializing virtual environment...</p>
      </div>
    </div>
  );
};

export default AppBootLoader;