import React from 'react';
import { GlassCabinControls } from './GlassCabinControls';
import { GlassLightsControls } from './GlassLightsControls';

export const GlassControls: React.FC = () => {
  return (
    <>
      <GlassCabinControls />
      <GlassLightsControls />
    </>
  );
};