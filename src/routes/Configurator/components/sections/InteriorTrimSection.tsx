import React from 'react';
import { useConfiguratorStore } from '@/store/configuratorStore';
import TexturePicker from '../ui/TexturePicker';
import type { PackageOption } from '@/config/types';

interface InteriorTrimSectionProps {
  options: PackageOption[];
}

const InteriorTrimSection: React.FC<InteriorTrimSectionProps> = ({ options }) => {
  const interiorTrimPackage = useConfiguratorStore((state) => state.interiorTrimPackage);
  const setInteriorTrimPackage = useConfiguratorStore((state) => state.setInteriorTrimPackage);
  const carColor = useConfiguratorStore((state) => state.carColor);

  return (
    <TexturePicker 
      title="Interior Trims" 
      options={options} 
      selectedValue={interiorTrimPackage} 
      onSelect={setInteriorTrimPackage} 
      dynamicHex={carColor}
      defaultOpen={false}
    />
  );
};

export default InteriorTrimSection;