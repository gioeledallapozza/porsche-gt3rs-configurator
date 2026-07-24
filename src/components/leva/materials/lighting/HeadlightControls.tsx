import React, { useEffect } from 'react';
import { useControls, folder } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const HeadlightControls: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const state = useLevaStore.getState();

  const headlight = useControls({
    Materials: folder({
      Lights: folder({
        Headlight: folder({
          color: { value: state.headlight.color, label: 'Color', onEditEnd: (value) => setTweaks('headlight', { color: value as string }) },
          emissive: { value: state.headlight.emissive, label: 'Emissive', onEditEnd: (value) => setTweaks('headlight', { emissive: value as string }) },
          emissiveIntensity: { value: state.headlight.emissiveIntensity, min: 0, max: 10, step: 0.1, onEditEnd: (value) => setTweaks('headlight', { emissiveIntensity: value as number }) },
          roughness: { value: state.headlight.roughness, min: 0, max: 1, step: 0.01, onEditEnd: (value) => setTweaks('headlight', { roughness: value as number }) },
          metalness: { value: state.headlight.metalness, min: 0, max: 1, step: 0.01, onEditEnd: (value) => setTweaks('headlight', { metalness: value as number }) },
          ior: { value: state.headlight.ior, min: 1, max: 3, step: 0.01, onEditEnd: (value) => setTweaks('headlight', { ior: value as number }) },
        }, { collapsed: true }),
      }, { collapsed: true }),
    }, { collapsed: true }),
  });

  useEffect(() => {
    setTweaks('headlight', headlight);
  }, [headlight, setTweaks]);

  return null;
};
