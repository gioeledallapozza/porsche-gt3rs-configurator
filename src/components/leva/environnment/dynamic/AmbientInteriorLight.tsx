import React from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const AmbientInteriorLight: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const initial = useLevaStore.getState().environment.interior;

 useControls({
    Environment: folder({
      Dynamic: folder({
        'Ambient Interior': folder({
          enabled: { value: initial.enabled, onChange: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, enabled: v } }) },
          showHelper: { value: initial.showHelper, onChange: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, showHelper: v } }) },
          ambientIntensity: { value: initial.ambientIntensity, min: 0, max: 5, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, ambientIntensity: v } }) },
        }, { collapsed: true }),
      }, { collapsed: false })
    }, { collapsed: false })
  });

  return null;
};