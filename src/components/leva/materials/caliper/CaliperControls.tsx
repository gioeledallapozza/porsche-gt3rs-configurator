import React, { useEffect } from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const CaliperControls: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const state = useLevaStore.getState();

  const caliper = useControls({
    Materials: folder({
      Caliper: folder({
        clearcoat: { value: state.caliper.clearcoat, min: 0, max: 1, step: 0.01 },
        clearcoatRoughness: { value: state.caliper.clearcoatRoughness, min: 0, max: 1, step: 0.01 },
        metalness: { value: state.caliper.metalness, min: 0, max: 1, step: 0.01 },
        roughness: { value: state.caliper.roughness, min: 0, max: 1, step: 0.01 },
        envMapIntensity: { value: state.caliper.envMapIntensity, min: 0, max: 5, step: 0.01 }
      }, { collapsed: true }),
    }, { collapsed: true }),
  });

  useEffect(() => {
    setTweaks('caliper', caliper);
  }, [caliper, setTweaks]);

  return null;
};