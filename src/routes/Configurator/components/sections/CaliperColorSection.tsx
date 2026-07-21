import React from 'react';
import { useConfiguratorStore } from '@/store/configuratorStore';
import ColorPicker from '../ui/ColorPicker';
import type { CaliperOption } from '@/config/types';

interface CaliperColorSectionProps {
  options: CaliperOption[];
}

const CaliperColorSection: React.FC<CaliperColorSectionProps> = ({ options }) => {
  const caliperColor = useConfiguratorStore((state) => state.caliperColor);
  const setCaliperColor = useConfiguratorStore((state) => state.setCaliperColor);

  const mappedOptions = options.map(opt => ({
    name: opt.name,
    hex: opt.hex,
    finish: 'solid' as const 
  }));

  return (
    <ColorPicker 
      title="Brake Calipers" 
      options={mappedOptions} 
      selectedValue={caliperColor} 
      onSelect={setCaliperColor} 
      defaultOpen={true}
    />
  );
};

export default CaliperColorSection;