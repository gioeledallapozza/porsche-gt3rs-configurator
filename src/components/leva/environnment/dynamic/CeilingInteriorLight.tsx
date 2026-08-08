import React from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const CeilingInteriorLight: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const initial = useLevaStore.getState().environment.interior.ceiling;

  useControls({
    Environment: folder({
      Dynamic: folder({
        Ceiling: folder({
          enabled: { value: initial.enabled, onChange: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, ceiling: { ...useLevaStore.getState().environment.interior.ceiling, enabled: v } } }) },
          intensity: { value: initial.intensity, min: 0, max: 10, step: 0.1, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, ceiling: { ...useLevaStore.getState().environment.interior.ceiling, intensity: v } } }) },
          positionX: { value: initial.positionX, min: -5, max: 5, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, ceiling: { ...useLevaStore.getState().environment.interior.ceiling, positionX: v } } }) },
          positionY: { value: initial.positionY, min: 0, max: 4, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, ceiling: { ...useLevaStore.getState().environment.interior.ceiling, positionY: v } } }) },
          positionZ: { value: initial.positionZ, min: -3, max: 3, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, ceiling: { ...useLevaStore.getState().environment.interior.ceiling, positionZ: v } } }) },
          distance: { value: initial.distance, min: 0.5, max: 10, step: 0.1, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, ceiling: { ...useLevaStore.getState().environment.interior.ceiling, distance: v } } }) },
          angle: { value: initial.angle, min: 0.1, max: Math.PI, step: 0.02, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, ceiling: { ...useLevaStore.getState().environment.interior.ceiling, angle: v } } }) },
          penumbra: { value: initial.penumbra, min: 0, max: 1, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, ceiling: { ...useLevaStore.getState().environment.interior.ceiling, penumbra: v } } }) },
        }, { collapsed: true }),
      }, { collapsed: false })
    }, { collapsed: false })
  });

  return null;
};