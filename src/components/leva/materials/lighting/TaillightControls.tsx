import React, { useEffect } from 'react';
import { useControls, folder } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const TaillightControls: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const state = useLevaStore.getState();

  const taillight = useControls({
    Materials: folder({
      Lights: folder({
        Taillight: folder({
          color: { value: state.taillight.color, label: 'Color', onEditEnd: (value) => setTweaks('taillight', { color: value as string }) },
          emissive: { value: state.taillight.emissive, label: 'Emissive', onEditEnd: (value) => setTweaks('taillight', { emissive: value as string }) },
          emissiveIntensity: { value: state.taillight.emissiveIntensity, min: 0, max: 10, step: 0.1, onEditEnd: (value) => setTweaks('taillight', { emissiveIntensity: value as number }) },
          roughness: { value: state.taillight.roughness, min: 0, max: 1, step: 0.01, onEditEnd: (value) => setTweaks('taillight', { roughness: value as number }) },
          metalness: { value: state.taillight.metalness, min: 0, max: 1, step: 0.01, onEditEnd: (value) => setTweaks('taillight', { metalness: value as number }) },
          ior: { value: state.taillight.ior, min: 1, max: 3, step: 0.01, onEditEnd: (value) => setTweaks('taillight', { ior: value as number }) },
        }, { collapsed: true }),
      }, { collapsed: true }),
    }, { collapsed: true }),
  });

  useEffect(() => {
    setTweaks('taillight', taillight);
  }, [taillight, setTweaks]);

  return null;
};
