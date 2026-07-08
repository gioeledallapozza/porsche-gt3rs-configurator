import React from 'react';
import { useConfiguratorStore } from '@/store/configuratorStore';
import OptionSelector from '../ui/OptionSelector';
import type { PackageOption } from '@/config/types';

interface AeroPackageSectionProps {
  options: PackageOption[];
}

const AeroPackageSection: React.FC<AeroPackageSectionProps> = ({ options }) => {
  // Only this wrapper re-renders when aeroPackage changes
  const aeroPackage = useConfiguratorStore((state) => state.aeroPackage);
  const setAeroPackage = useConfiguratorStore((state) => state.setAeroPackage);

  return (
    <OptionSelector 
      title="Aerodynamics" 
      options={options} 
      selectedValue={aeroPackage} 
      onSelect={setAeroPackage} 
    />
  );
};

export default AeroPackageSection;