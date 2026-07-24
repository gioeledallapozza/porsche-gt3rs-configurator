import React from 'react';
import ExteriorColorSection from '../sections/ExteriorColorSection.tsx';
import AeroPackageSection from '../sections/AeroPackageSection.tsx';
import WheelColorSection from '../sections/WheelColorSection.tsx';
import CaliperColorSection from '../sections/CaliperColorSection.tsx';
import type { VehicleConfig } from '@/config/types';
import styles from './Configurator.module.css';

interface ConfiguratorSidebarProps {
  config: VehicleConfig;
}

export const ConfiguratorSidebar: React.FC<ConfiguratorSidebarProps> = ({ config }) => {
  return (
    <aside className={styles.uiPanel}>
      {/* Isolated Subscriptions: Zero impact on Canvas performance */}
      <ExteriorColorSection options={config.paintOptions} />
      
      {config.aeroOptions && (
        <AeroPackageSection options={config.aeroOptions} />
      )}

      {config.wheelOption && (
        <WheelColorSection options={config.wheelOption} />
      )}

      {config.caliperOptions && (
        <CaliperColorSection options={config.caliperOptions} />
      )}
    </aside>
  );
};

export default ConfiguratorSidebar;