import React, { useEffect } from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const LeatherControls: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const state = useLevaStore.getState();

  const leather = useControls({
    Materials: folder({
      Leather: folder({
        roughness: { value: state.leather.roughness, min: 0, max: 1, step: 0.01 },
        metalness: { value: state.leather.metalness, min: 0, max: 1, step: 0.01 },
        clearcoat: { value: state.leather.clearcoat, min: 0, max: 1, step: 0.01 },
        clearcoatRoughness: { value: state.leather.clearcoatRoughness, min: 0, max: 1, step: 0.01 },
        sheen: { value: state.leather.sheen, min: 0, max: 1, step: 0.01 },
        sheenRoughness: { value: state.leather.sheenRoughness, min: 0, max: 1, step: 0.01 },
        normalScale: { value: state.leather.normalScale, min: 0, max: 2, step: 0.01 },
        envMapIntensity: { value: state.leather.envMapIntensity, min: 0, max: 5, step: 0.01 },
      }, { collapsed: true }),
    }, { collapsed: true }),
  });

  useEffect(() => {
    setTweaks('leather', leather);
  }, [leather, setTweaks]);

  return null;
};
