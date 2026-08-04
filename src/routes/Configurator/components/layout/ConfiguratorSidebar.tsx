import React from 'react';
import ExteriorColorSection from '../sections/ExteriorColorSection';
import AeroPackageSection from '../sections/AeroPackageSection';
import WheelColorSection from '../sections/WheelColorSection';
import CaliperColorSection from '../sections/CaliperColorSection';

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
  return (
    <aside className={styles.uiPanel}>
      {/* Isolated Subscriptions: Zero impact on Canvas performance */}
      {/* -- EXTERIOR -- */}
      <ExteriorColorSection options={config.paintOptions} />
      
      {config.aeroOptions && (
        <AeroPackageSection options={config.aeroOptions} />
      )}

      {config.wheelOptions && (
        <WheelColorSection options={config.wheelOptions} />
      )}

      {config.caliperOptions && (
        <CaliperColorSection options={config.caliperOptions} />
      )}

      {/* -- INTERIOR -- */}
      {config.interiorColorOptions && (
        <LeatherSection options={config.interiorColorOptions} />
      )}
      {config.interiorTrimOptions && (
        <InteriorTrimSection options={config.interiorTrimOptions} />
      )}
      {config.stitchingOptions && (
        <StitchingColorSection options={config.stitchingOptions} />
      )}
      {config.seatbeltOptions && (
        <SeatBeltColorSection options={config.seatbeltOptions} />
      )}
    </aside>
  );
};

export default ConfiguratorSidebar;