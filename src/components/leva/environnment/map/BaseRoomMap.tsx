import React from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const BaseRoomMap: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const initial = useLevaStore.getState().environment;

  useControls({
    Environment: folder({
      Map: folder({
        'Base Room': folder({
          intensity: { value: initial.envIntensity, min: 0, max: 10, step: 0.1, onEditEnd: (v) => setTweaks('environment', { envIntensity: v }) },
          scale: { value: initial.envScale, min: 1, max: 200, step: 1, onEditEnd: (v) => setTweaks('environment', { envScale: v }) },
        }, { collapsed: true }),
      }, { collapsed: false })
    }, { collapsed: false })
  });

  return null;
};