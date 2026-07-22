import React, { useEffect } from 'react';
import { useControls, folder } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const LicensePlateControls: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const state = useLevaStore.getState();

  const licensePlate = useControls({
    Materials: folder({
      Lights: folder({
        LicensePlate: folder({
          color: { value: state.licensePlate.color, label: 'Color', onEditEnd: (value) => setTweaks('licensePlate', { color: value as string }) },
          emissive: { value: state.licensePlate.emissive, label: 'Emissive', onEditEnd: (value) => setTweaks('licensePlate', { emissive: value as string }) },
          emissiveIntensity: { value: state.licensePlate.emissiveIntensity, min: 0, max: 10, step: 0.1, onEditEnd: (value) => setTweaks('licensePlate', { emissiveIntensity: value as number }) },
          roughness: { value: state.licensePlate.roughness, min: 0, max: 1, step: 0.01, onEditEnd: (value) => setTweaks('licensePlate', { roughness: value as number }) },
          metalness: { value: state.licensePlate.metalness, min: 0, max: 1, step: 0.01, onEditEnd: (value) => setTweaks('licensePlate', { metalness: value as number }) },
          ior: { value: state.licensePlate.ior, min: 1, max: 3, step: 0.01, onEditEnd: (value) => setTweaks('licensePlate', { ior: value as number }) },
        }, { collapsed: true }),
      }, { collapsed: true }),
    }, { collapsed: true }),
  });

  useEffect(() => {
    setTweaks('licensePlate', licensePlate);
  }, [licensePlate, setTweaks]);

  return null;
};
