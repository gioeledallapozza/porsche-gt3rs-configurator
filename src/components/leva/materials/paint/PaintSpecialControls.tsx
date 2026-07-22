import React, { useEffect } from 'react';
import { useControls, folder } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const PaintSpecialControls: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const state = useLevaStore.getState();

  const paintSpecial = useControls({
    Materials: folder({
      Paint: folder({
        Special: folder({
          clearcoat: { value: state.paintSpecial.clearcoat, min: 0, max: 1, step: 0.01 },
          clearcoatRoughness: { value: state.paintSpecial.clearcoatRoughness, min: 0, max: 1, step: 0.01 },
          metalness: { value: state.paintSpecial.metalness, min: 0, max: 1, step: 0.01 },
          roughness: { value: state.paintSpecial.roughness, min: 0, max: 1, step: 0.01 },
        }, { collapsed: true }),
      }, { collapsed: true }),
    }, { collapsed: true }),
  });

  useEffect(() => {
    setTweaks('paintSpecial', paintSpecial);
  }, [paintSpecial, setTweaks]);

  return null;
};
