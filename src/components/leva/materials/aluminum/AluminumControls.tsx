import React, { useEffect } from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const AluminumControls: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const state = useLevaStore.getState();

  const aluminum = useControls({
    Materials: folder({
      Aluminum: folder({
        color: { value: state.aluminum.color },
        clearcoat: { value: state.aluminum.clearcoat, min: 0, max: 1, step: 0.01 },
        clearcoatRoughness: { value: state.aluminum.clearcoatRoughness, min: 0, max: 1, step: 0.01 },
        metalness: { value: state.aluminum.metalness, min: 0, max: 1, step: 0.01 },
        roughness: { value: state.aluminum.roughness, min: 0, max: 1, step: 0.01 },
        normalScale: { value: state.aluminum.normalScale, min: 0, max: 2, step: 0.01 },
        envMapIntensity: { value: state.aluminum.envMapIntensity, min: 0, max: 5, step: 0.01 },
      }, { collapsed: true }),
    }, { collapsed: true }),
  });

  useEffect(() => {
    setTweaks('aluminum', aluminum);
  }, [aluminum, setTweaks]);

  return null;
};
