import React, { useEffect } from 'react';
import { useControls, folder } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const PaintMetallicControls: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const state = useLevaStore.getState();

  const paintMetallic = useControls({
    Materials: folder({
      Paint: folder({
        Metallic: folder({
          clearcoat: { value: state.paintMetallic.clearcoat, min: 0, max: 1, step: 0.01 },
          clearcoatRoughness: { value: state.paintMetallic.clearcoatRoughness, min: 0, max: 1, step: 0.01 },
          metalness: { value: state.paintMetallic.metalness, min: 0, max: 1, step: 0.01 },
          roughness: { value: state.paintMetallic.roughness, min: 0, max: 1, step: 0.01 },
          flakeScale: { value: state.paintMetallic.flakeScale, min: 10, max: 1000, step: 1 },
          flakeIntensity: { value: state.paintMetallic.flakeIntensity, min: 0.1, max: 10, step: 0.1 },
        }, { collapsed: true }),
      }, { collapsed: true }),
    }, { collapsed: true }),
  });

  useEffect(() => {
    setTweaks('paintMetallic', paintMetallic);
  }, [paintMetallic, setTweaks]);

  return null;
};
