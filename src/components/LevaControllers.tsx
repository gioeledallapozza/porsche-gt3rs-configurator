import React from 'react';
import { CameraSettings } from '@/components/leva/camera/CameraSettings.tsx';
import { MaterialControls } from '@/components/leva/materials/MaterialControls.tsx';
import { EnvironmentControls } from '@/components/leva/EnvironmentControls';

const LevaControllers: React.FC = () => {
  return (
    <>    
      <EnvironmentControls />
      <CameraSettings />
      <MaterialControls />
    </>
  );
};

export default LevaControllers;