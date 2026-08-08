import React from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const DashInteriorLight: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const initial = useLevaStore.getState().environment.interior.dash;

  useControls({
    Environment: folder({
      Dynamic: folder({
        Dashboard: folder({
          enabled: { value: initial.enabled, onChange: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, dash: { ...useLevaStore.getState().environment.interior.dash, enabled: v } } }) },
          intensity: { value: initial.intensity, min: 0, max: 10, step: 0.1, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, dash: { ...useLevaStore.getState().environment.interior.dash, intensity: v } } }) },
          positionX: { value: initial.positionX, min: -3, max: 3, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, dash: { ...useLevaStore.getState().environment.interior.dash, positionX: v } } }) },
          positionY: { value: initial.positionY, min: 0, max: 3, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, dash: { ...useLevaStore.getState().environment.interior.dash, positionY: v } } }) },
          positionZ: { value: initial.positionZ, min: -3, max: 3, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, dash: { ...useLevaStore.getState().environment.interior.dash, positionZ: v } } }) },
          rotationX: { value: initial.rotationX, min: -Math.PI, max: Math.PI, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, dash: { ...useLevaStore.getState().environment.interior.dash, rotationX: v } } }) },
          rotationY: { value: initial.rotationY, min: -Math.PI, max: Math.PI, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, dash: { ...useLevaStore.getState().environment.interior.dash, rotationY: v } } }) },
          rotationZ: { value: initial.rotationZ, min: -Math.PI, max: Math.PI, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, dash: { ...useLevaStore.getState().environment.interior.dash, rotationZ: v } } }) },
        }, { collapsed: true }),
      }, { collapsed: false })
    }, { collapsed: false })
  });

  return null;
};