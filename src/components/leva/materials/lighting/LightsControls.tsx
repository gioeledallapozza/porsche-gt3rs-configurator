import React from 'react';
import { HeadlightControls } from '@/components/leva/materials/lighting/HeadlightControls';
import { TaillightControls } from '@/components/leva/materials/lighting/TaillightControls';
import { SignalControls } from '@/components/leva/materials/lighting/SignalControls';
import { LicensePlateControls } from '@/components/leva/materials/lighting/LicensePlateControls';

export const LightsControls: React.FC = () => {
  return (
    <>
      <HeadlightControls />
      <TaillightControls />
      <SignalControls />
      <LicensePlateControls />
    </>
  );
};
