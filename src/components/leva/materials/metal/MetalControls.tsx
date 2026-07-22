import React, { useEffect } from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const MetalControls: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const state = useLevaStore.getState();

  const metal = useControls({
    Materials: folder({
      Metal: folder({
        clearcoat: { value: state.metal.clearcoat, min: 0, max: 1, step: 0.01 },
        clearcoatRoughness: { value: state.metal.clearcoatRoughness, min: 0, max: 1, step: 0.01 },
        metalness: { value: state.metal.metalness, min: 0, max: 1, step: 0.01 },
        roughness: { value: state.metal.roughness, min: 0, max: 1, step: 0.01 },
        envMapIntensity: {value: state.metal.envMapIntensity, min: 0, max: 5, step: 0.01 }
      }, { collapsed: true }),
    }, { collapsed: true }),
  });

  useEffect(() => {
    setTweaks('metal', metal);
  }, [metal, setTweaks]);

  return null;
};
