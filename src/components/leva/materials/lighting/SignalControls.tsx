import React, { useEffect } from 'react';
import { useControls, folder } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const SignalControls: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const state = useLevaStore.getState();

  const signal = useControls({
    Materials: folder({
      Lights: folder({
        Signal: folder({
          color: { value: state.signal.color, label: 'Color', onEditEnd: (value) => setTweaks('signal', { color: value as string }) },
          emissive: { value: state.signal.emissive, label: 'Emissive', onEditEnd: (value) => setTweaks('signal', { emissive: value as string }) },
          emissiveIntensity: { value: state.signal.emissiveIntensity, min: 0, max: 10, step: 0.1, onEditEnd: (value) => setTweaks('signal', { emissiveIntensity: value as number }) },
          roughness: { value: state.signal.roughness, min: 0, max: 1, step: 0.01, onEditEnd: (value) => setTweaks('signal', { roughness: value as number }) },
          metalness: { value: state.signal.metalness, min: 0, max: 1, step: 0.01, onEditEnd: (value) => setTweaks('signal', { metalness: value as number }) },
          ior: { value: state.signal.ior, min: 1, max: 3, step: 0.01, onEditEnd: (value) => setTweaks('signal', { ior: value as number }) },
        }, { collapsed: true }),
      }, { collapsed: true }),
    }, { collapsed: true }),
  });

  useEffect(() => {
    setTweaks('signal', signal);
  }, [signal, setTweaks]);

  return null;
};
