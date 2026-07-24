import React, { useEffect } from 'react';
import { useControls, folder } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const CarbonForgedControls: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const state = useLevaStore.getState();

  const carbonForged = useControls({
    Materials: folder({
      Carbon: folder({
        Forged: folder({
          color: { value: state.carbonForged.color },
          clearcoat: { value: state.carbonForged.clearcoat, min: 0, max: 1, step: 0.01 },
          clearcoatRoughness: { value: state.carbonForged.clearcoatRoughness, min: 0, max: 1, step: 0.01 },
          metalness: { value: state.carbonForged.metalness, min: 0, max: 1, step: 0.01 },
          roughness: { value: state.carbonForged.roughness, min: 0, max: 1, step: 0.01 },
          normalScale: { value: state.carbonForged.normalScale, min: 0, max: 2, step: 0.01 },
          envMapIntensity: { value: state.carbonForged.envMapIntensity, min: 0, max: 5, step: 0.01 },
        }, { collapsed: true }),
      }, { collapsed: true }),
    }, { collapsed: true }),
  });

  useEffect(() => {
    setTweaks('carbonForged', carbonForged);
  }, [carbonForged, setTweaks]);

  return null;
};
