import React, { useEffect } from 'react';
import { useControls, folder } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const CarbonTwillControls: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const state = useLevaStore.getState();

  const carbonTwill = useControls({
    Materials: folder({
      Carbon: folder({
        Twill: folder({
          color: { value: state.carbonTwill.color },
          clearcoat: { value: state.carbonTwill.clearcoat, min: 0, max: 1, step: 0.01 },
          clearcoatRoughness: { value: state.carbonTwill.clearcoatRoughness, min: 0, max: 1, step: 0.01 },
          metalness: { value: state.carbonTwill.metalness, min: 0, max: 1, step: 0.01 },
          roughness: { value: state.carbonTwill.roughness, min: 0, max: 1, step: 0.01 },
          normalScale: { value: state.carbonTwill.normalScale, min: 0, max: 2, step: 0.01 },
          envMapIntensity: { value: state.carbonTwill.envMapIntensity, min: 0, max: 5, step: 0.01 },
        }, { collapsed: true }),
      }, { collapsed: true }),
    }, { collapsed: true }),
  });
  useEffect(() => {
    setTweaks('carbonTwill', carbonTwill);
  }, [carbonTwill, setTweaks]);

  return null;
};
