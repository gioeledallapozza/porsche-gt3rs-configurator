// src/routes/Configurator/components/layout/ConfiguratorSidebar.tsx
import React, { useState } from 'react';
import { useConfiguratorStore } from '@/store/configuratorStore';

// --- EXTERIOR SECTIONS ---
import ExteriorColorSection from '../sections/ExteriorColorSection';
import AeroPackageSection from '../sections/AeroPackageSection';
import WheelColorSection from '../sections/WheelColorSection';
import CaliperColorSection from '../sections/CaliperColorSection';

// --- INTERIOR SECTIONS ---
import LeatherSection from '../sections/LeatherSection';
import InteriorTrimSection from '../sections/InteriorTrimSection';
import StitchingColorSection from '../sections/StitchingColorSection';
import SeatBeltColorSection from '../sections/SeatBeltColorSection';

import type { VehicleConfig } from '@/config/types';
import styles from './Configurator.module.css';

interface ConfiguratorSidebarProps {
  config: VehicleConfig;
}

export const ConfiguratorSidebar: React.FC<ConfiguratorSidebarProps> = ({ config }) => {
  const [isExteriorOpen, setIsExteriorOpen] = useState(true);
  const [isInteriorOpen, setIsInteriorOpen] = useState(false);

  const setActiveCameraPreset = useConfiguratorStore((state) => state.setActiveCameraPreset);
  const activeCameraPreset = useConfiguratorStore((state) => state.activeCameraPreset);

  // Helpers to detect current context
  const isInteriorView = activeCameraPreset.includes('interior');
  const isWheelView = activeCameraPreset === 'wheel_close';

  // Only switches to hero view if the user is stuck inside or looking closely at wheels
  const switchToExteriorIfNeeded = () => {
    if (isInteriorView || isWheelView) {
      setActiveCameraPreset('hero_view');
    }
  };

  // Only switches to interior view if the user is outside
  // If they are already inside (e.g. interior_rear_view), it leaves them there
  const switchToInteriorIfNeeded = () => {
    if (!isInteriorView) {
      setActiveCameraPreset('interior_view');
    }
  };

  // Forcefully changes the preset for highly specific targets
  const forcePreset = (presetId: string) => {
    if (activeCameraPreset !== presetId) {
      setActiveCameraPreset(presetId);
    }
  };

  const toggleExterior = () => {
    const nextState = !isExteriorOpen;
    setIsExteriorOpen(nextState);
    if (nextState) {
      switchToExteriorIfNeeded();
    }
  };

  const toggleInterior = () => {
    const nextState = !isInteriorOpen;
    setIsInteriorOpen(nextState);
    if (nextState) {
      switchToInteriorIfNeeded();
    }
  };

  const getHeaderStyle = (isOpen: boolean): React.CSSProperties => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    borderBottom: isOpen ? '2px solid #fff' : '2px solid rgba(255, 255, 255, 0.15)',
    color: isOpen ? '#fff' : 'rgba(255, 255, 255, 0.5)',
    padding: '0 0 1rem 0',
    marginBottom: '1.5rem',
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  });

  return (
    <aside className={styles.uiPanel}>
      
      {/* --- MAIN CATEGORY: EXTERIOR --- */}
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={toggleExterior}
          style={getHeaderStyle(isExteriorOpen)}
          aria-expanded={isExteriorOpen}
        >
          Exterior
          <span style={{ fontSize: '0.7rem' }}>
            {isExteriorOpen ? '▼' : '▶'}
          </span>
        </button>
        
        {isExteriorOpen && (
          <div style={{ animation: 'fadeIn 0.4s ease forwards' }}>
            
            <div onClickCapture={switchToExteriorIfNeeded}>
              <ExteriorColorSection options={config.paintOptions} />
            </div>
            
            {config.aeroOptions && (
              <div onClickCapture={switchToExteriorIfNeeded}>
                <AeroPackageSection options={config.aeroOptions} />
              </div>
            )}

            {config.wheelOptions && (
              <div onClickCapture={() => forcePreset('wheel_close')}>
                <WheelColorSection options={config.wheelOptions} />
              </div>
            )}

            {config.caliperOptions && (
              <div onClickCapture={() => forcePreset('wheel_close')}>
                <CaliperColorSection options={config.caliperOptions} />
              </div>
            )}

          </div>
        )}
      </div>

      {/* --- MAIN CATEGORY: INTERIOR --- */}
      <div>
        <button 
          onClick={toggleInterior}
          style={getHeaderStyle(isInteriorOpen)}
          aria-expanded={isInteriorOpen}
        >
          Interior
          <span style={{ fontSize: '0.7rem' }}>
            {isInteriorOpen ? '▼' : '▶'}
          </span>
        </button>

        {isInteriorOpen && (
          <div style={{ animation: 'fadeIn 0.4s ease forwards' }}>
            
            {config.interiorColorOptions && (
              <div onClickCapture={switchToInteriorIfNeeded}>
                <LeatherSection options={config.interiorColorOptions} />
              </div>
            )}
            
            {config.interiorTrimOptions && (
              <div onClickCapture={switchToInteriorIfNeeded}>
                <InteriorTrimSection options={config.interiorTrimOptions} />
              </div>
            )}

            {config.stitchingOptions && (
              <div onClickCapture={switchToInteriorIfNeeded}>
                <StitchingColorSection options={config.stitchingOptions} />
              </div>
            )}

            {config.seatbeltOptions && (
              <div onClickCapture={() => forcePreset('interior_rear_view')}>
                <SeatBeltColorSection options={config.seatbeltOptions} />
              </div>
            )}

          </div>
        )}
      </div>
      
    </aside>
  );
};

export default ConfiguratorSidebar;