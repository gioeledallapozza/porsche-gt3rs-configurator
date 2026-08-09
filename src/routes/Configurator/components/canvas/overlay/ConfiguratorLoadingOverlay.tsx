import React, { useEffect, useRef, useState } from 'react';
import { useConfiguratorStore } from '@/store/configuratorStore';
import styles from './ConfiguratorLoadingOverlay.module.css';

//Min time on screen
const MIN_VISIBLE_MS = 500;

const ConfiguratorLoadingOverlay: React.FC = () => {
  const isInitialized = useConfiguratorStore((s) => s.isInitialized);
  const isEnvReady = useConfiguratorStore((s) => s.isEnvReady);
  const isModelReady = useConfiguratorStore((s) => s.isModelReady);

  const currentVehicleId = useConfiguratorStore((s) => s.currentVehicleId);

  const allReady = isInitialized && isEnvReady && isModelReady;

  const [canHide, setCanHide] = useState(false);
  const shownAt = useRef(performance.now());

  // UseEffect to manage the minimum visible time of the overlay
  useEffect(() => {
    if (!allReady) return;
    const elapsed = performance.now() - shownAt.current;
    const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);
    const t = setTimeout(() => setCanHide(true), remaining);
    return () => clearTimeout(t);
  }, [allReady]);

  const isVisible = !canHide;

  // Progress is deliberately "stepped" (33/66/100) rather than byte-accurate:
  // envMap PMREM generation does not report granular percentages,
  // so a "true" progress bar would get stuck halfway and appear broken
  const steps = [isInitialized, isEnvReady, isModelReady];
  const progress = (steps.filter(Boolean).length / steps.length) * 100;

  const statusLabel = !isInitialized
    ? 'Preparing configuration...'
    : !isEnvReady
    ? 'Building virtual studio...'
    : !isModelReady
    ? 'Loading vehicle assets...'
    : 'Ready';

  const displayName = currentVehicleId ? currentVehicleId.toUpperCase() : 'VEHICLE';

  return (
    <div
      className={styles.overlay}
      style={{ opacity: isVisible ? 1 : 0, pointerEvents: isVisible ? 'auto' : 'none' }}
      aria-hidden={!isVisible}
    >
      <div className={styles.content}>
        <span className={styles.mark}>{displayName}</span>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <p className={styles.statusLabel} role="status" aria-live="polite">{statusLabel}</p>
      </div>
    </div>
  );
};

export default ConfiguratorLoadingOverlay;