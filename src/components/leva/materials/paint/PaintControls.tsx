import React from 'react';
import { PaintSolidControls } from '@/components/leva/materials/paint/PaintSolidControls.tsx';
import { PaintMetallicControls } from '@/components/leva/materials/paint/PaintMetallicControls.tsx';
import { PaintSpecialControls } from '@/components/leva/materials/paint/PaintSpecialControls.tsx';

export const PaintControls: React.FC = () => {
  return (
    <>
      <PaintSolidControls />
      <PaintMetallicControls />
      <PaintSpecialControls />
    </>
  );
};
