import React, { useEffect } from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const RubberControls: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const state = useLevaStore.getState();

  const rubber = useControls({
    Materials: folder({
      Rubber: folder({
        roughness: { value: state.rubber.roughness, min: 0, max: 1, step: 0.01 },
        metalness: { value: state.rubber.metalness, min: 0, max: 1, step: 0.01 },
        envMapIntensity: { value: state.rubber.envMapIntensity, min: 0, max: 5, step: 0.01 }
      }, { collapsed: true }),
    }, { collapsed: true }),
  });

  useEffect(() => {
    setTweaks('rubber', rubber);
  }, [rubber, setTweaks]);

  return null;
};