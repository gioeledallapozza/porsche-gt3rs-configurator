import React from 'react';
import { useConfiguratorStore } from '@/store/configuratorStore';
import ColorPicker from '../ui/ColorPicker';
import type { ColorOption } from '@/config/types';

interface StitchingColorSectionProps {
  options: ColorOption[];
}

const StitchingColorSection: React.FC<StitchingColorSectionProps> = ({ options }) => {
  const stitchingColor = useConfiguratorStore((state) => state.stitchingColor);
  const setStitchingColor = useConfiguratorStore((state) => state.setStitchingColor);

  const mappedOptions = options.map(opt => ({
    name: opt.name, hex: opt.hex, finish: 'solid' as const 
  }));

  return (
    <ColorPicker 
      title="Stitching Color" 
      options={mappedOptions} 
      selectedValue={stitchingColor} 
      onSelect={setStitchingColor} 
      defaultOpen={true} 
    />
  );
};

export default StitchingColorSection;