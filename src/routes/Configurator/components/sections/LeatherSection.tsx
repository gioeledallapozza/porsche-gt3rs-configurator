import React from 'react';
import { useConfiguratorStore } from '@/store/configuratorStore';
import ColorPicker from '../ui/ColorPicker';
import type { ColorOption } from '@/config/types';

interface LeatherColorSectionProps {
  options: ColorOption[];
}

const LeatherColorSection: React.FC<LeatherColorSectionProps> = ({ options }) => {
  const interiorColor = useConfiguratorStore((state) => state.interiorColor);
  const setInteriorColor = useConfiguratorStore((state) => state.setInteriorColor);

  const mappedOptions = options.map(opt => ({
    name: opt.name, hex: opt.hex, finish: 'solid' as const 
  }));

  return (
    <ColorPicker 
      title="Interior Leather" 
      options={mappedOptions} 
      selectedValue={interiorColor} 
      onSelect={setInteriorColor} 
      defaultOpen={false}
    />
  );
};

export default LeatherColorSection;