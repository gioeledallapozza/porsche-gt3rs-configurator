import React from 'react';
import { useConfiguratorStore } from '@/store/configuratorStore';
import ColorPicker from '../ui/ColorPicker';
import type { ColorOption } from '@/config/types';

interface SeatbeltColorSectionProps {
  options: ColorOption[];
}

const SeatbeltColorSection: React.FC<SeatbeltColorSectionProps> = ({ options }) => {
  const seatbeltColor = useConfiguratorStore((state) => state.seatbeltColor);
  const setSeatbeltColor = useConfiguratorStore((state) => state.setSeatbeltColor);

  const mappedOptions = options.map(opt => ({
    name: opt.name, hex: opt.hex, finish: 'solid' as const 
  }));

  return (
    <ColorPicker 
      title="Seatbelts" 
      options={mappedOptions} 
      selectedValue={seatbeltColor} 
      onSelect={setSeatbeltColor} 
      defaultOpen={true} />
  );
};

export default SeatbeltColorSection;