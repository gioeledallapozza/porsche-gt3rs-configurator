import React, { useEffect } from 'react';
import { useControls, folder } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const PaintSolidControls: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const state = useLevaStore.getState();

  const paintSolid = useControls({
    Materials: folder({
      Paint: folder({
        Solid: folder({
          clearcoat: { value: state.paintSolid.clearcoat, min: 0, max: 1, step: 0.01 },
          clearcoatRoughness: { value: state.paintSolid.clearcoatRoughness, min: 0, max: 1, step: 0.01 },
          metalness: { value: state.paintSolid.metalness, min: 0, max: 1, step: 0.01 },
          roughness: { value: state.paintSolid.roughness, min: 0, max: 1, step: 0.01 },
        }, { collapsed: true }),
      }, { collapsed: true }),
    }, { collapsed: true }),
  });

  useEffect(() => {
    setTweaks('paintSolid', paintSolid);
  }, [paintSolid, setTweaks]);

  return null;
};
