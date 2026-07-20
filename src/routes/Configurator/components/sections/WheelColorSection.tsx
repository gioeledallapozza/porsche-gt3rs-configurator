import React from 'react';
import { useConfiguratorStore } from '@/store/configuratorStore';
import ColorPicker from '../ui/ColorPicker';
import type { WheelOption } from '@/config/types';

interface WheelColorSectionProps {
  options: WheelOption[];
}

const WheelColorSection: React.FC<WheelColorSectionProps> = ({ options }) => {
  const wheelColor = useConfiguratorStore((state) => state.wheelColor);
  const setWheelColor = useConfiguratorStore((state) => state.setWheelColor);

  // Mapping to adapt to the color picker UI Component
  const mappedOptions = options.map(opt => ({
    name: opt.name,
    hex: opt.hex,
    finish: 'metallic' as const
  }));

  return (
    <ColorPicker 
      title="Wheels & Rims" 
      options={mappedOptions} 
      selectedValue={wheelColor} 
      onSelect={setWheelColor} 
      defaultOpen={true}
    />
  );
};

export default WheelColorSection;