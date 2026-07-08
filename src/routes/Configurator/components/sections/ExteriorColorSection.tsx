import React from 'react';
import { useConfiguratorStore } from '@/store/configuratorStore';
import ColorPicker from '../ui/ColorPicker';
import type { PaintOption } from '@/config/types';

interface ExteriorColorSectionProps {
  options: PaintOption[];
}

const ExteriorColorSection: React.FC<ExteriorColorSectionProps> = ({ options }) => {
  // Only this wrapper re-renders when carColor changes
  const carColor = useConfiguratorStore((state) => state.carColor);
  const setCarColor = useConfiguratorStore((state) => state.setCarColor);

  return (
    <ColorPicker 
      title="Exterior Colors" 
      options={options} 
      selectedValue={carColor} 
      onSelect={setCarColor} 
    />
  );
};

export default ExteriorColorSection;