// src/routes/Configurator/components/sections/AeroPackageSection.tsx
import React from 'react';
import { useConfiguratorStore } from '@/store/configuratorStore';
import TexturePicker from '../ui/TexturePicker';
import type { PackageOption } from '@/config/types';

interface AeroPackageSectionProps {
  options: PackageOption[];
}

const AeroPackageSection: React.FC<AeroPackageSectionProps> = ({ options }) => {
  const aeroPackage = useConfiguratorStore((state) => state.aeroPackage);
  const setAeroPackage = useConfiguratorStore((state) => state.setAeroPackage);
  const carColor = useConfiguratorStore((state) => state.carColor); // Recuperiamo il colore

  return (
    <TexturePicker 
      title="Aerodynamics" 
      options={options} 
      selectedValue={aeroPackage} 
      onSelect={setAeroPackage} 
      dynamicHex={carColor}
    />
  );
};

export default AeroPackageSection;