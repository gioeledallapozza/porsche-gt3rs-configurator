import React from 'react';
import { CarbonControls } from '@/components/leva/materials/carbon/CarbonControls.tsx';
import { PaintControls } from '@/components/leva/materials/paint/PaintControls.tsx';
import { LightsControls } from '@/components/leva/materials/lighting/LightsControls';
import { MetalControls } from '@/components/leva/materials/metal/MetalControls';
import { RubberControls } from '@/components/leva/materials/rubber/RubberControls.tsx';
import { CaliperControls } from '@/components/leva/materials/caliper/CaliperControls.tsx';

export const MaterialControls: React.FC = () => {
  return (
    <>
      <PaintControls />
      <CarbonControls />
      <LightsControls />
      <MetalControls />
      <RubberControls />
      <CaliperControls />
    </>
  );
};
