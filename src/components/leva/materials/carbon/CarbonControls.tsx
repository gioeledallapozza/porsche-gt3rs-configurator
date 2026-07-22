import React from 'react';
import { CarbonTwillControls } from '@/components/leva/materials/carbon/CarbonTwillControls';
import { CarbonForgedControls } from '@/components/leva/materials/carbon/CarbonForgedControls';

export const CarbonControls: React.FC = () => {
  return (
    <>
      <CarbonTwillControls />
      <CarbonForgedControls />
    </>
  );
};
