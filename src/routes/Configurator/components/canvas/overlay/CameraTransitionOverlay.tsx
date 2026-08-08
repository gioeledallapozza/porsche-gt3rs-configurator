import React from 'react';
import { useConfiguratorStore } from '@/store/configuratorStore';

const CameraTransitionOverlay: React.FC = () => {
  // Listen to the state that your Manager toggles between true and false
  const isTransitioning = useConfiguratorStore((state) => state.isCameraTransitioning);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        zIndex: 50, 
        pointerEvents: 'none', 
        opacity: isTransitioning ? 1 : 0, 
        transition: 'opacity 1s ease-in-out', 
      }}
    />
  );
};

export default CameraTransitionOverlay;