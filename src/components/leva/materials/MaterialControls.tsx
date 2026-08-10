import React from 'react';
import { CarbonControls } from '@/components/leva/materials/carbon/CarbonControls.tsx';
import { PaintControls } from '@/components/leva/materials/paint/PaintControls.tsx';
import { LightsControls } from '@/components/leva/materials/lighting/LightsControls.tsx';
import { GlassControls } from '@/components/leva/materials//glass/GlassControls.tsx';
import { MetalControls } from '@/components/leva/materials/metal/MetalControls.tsx';
import { LeatherControls } from '@/components/leva/materials/leather/LeatherControls.tsx';
import { AluminumControls } from '@/components/leva/materials/aluminum/AluminumControls.tsx';
import { RubberControls } from '@/components/leva/materials/rubber/RubberControls.tsx';
import { CaliperControls } from '@/components/leva/materials/caliper/CaliperControls.tsx';


export const MaterialControls: React.FC = () => {
  return (
    <>
      <PaintControls />
      <CarbonControls />
      <LightsControls />
      <GlassControls />
      <MetalControls />
      <LeatherControls />
      <AluminumControls />
      <RubberControls />
      <CaliperControls />
    </>
  );
};
