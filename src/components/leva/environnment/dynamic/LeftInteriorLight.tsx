import React from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const LeftInteriorLight: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const initial = useLevaStore.getState().environment.interior.leftPane;

  useControls({
    Environment: folder({
      Dynamic: folder({
        'Left Glass': folder({
          enabled: { value: initial.enabled, onChange: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, leftPane: { ...useLevaStore.getState().environment.interior.leftPane, enabled: v } } }) },
          intensity: { value: initial.intensity, min: 0, max: 10, step: 0.1, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, leftPane: { ...useLevaStore.getState().environment.interior.leftPane, intensity: v } } }) },
          positionX: { value: initial.positionX, min: -3, max: 3, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, leftPane: { ...useLevaStore.getState().environment.interior.leftPane, positionX: v } } }) },
          positionY: { value: initial.positionY, min: 0, max: 3, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, leftPane: { ...useLevaStore.getState().environment.interior.leftPane, positionY: v } } }) },
          positionZ: { value: initial.positionZ, min: -3, max: 3, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, leftPane: { ...useLevaStore.getState().environment.interior.leftPane, positionZ: v } } }) },
          rotationX: { value: initial.rotationX, min: -Math.PI, max: Math.PI, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, leftPane: { ...useLevaStore.getState().environment.interior.leftPane, rotationX: v } } }) },
          rotationY: { value: initial.rotationY, min: -Math.PI, max: Math.PI, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, leftPane: { ...useLevaStore.getState().environment.interior.leftPane, rotationY: v } } }) },
          rotationZ: { value: initial.rotationZ, min: -Math.PI, max: Math.PI, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, leftPane: { ...useLevaStore.getState().environment.interior.leftPane, rotationZ: v } } }) },
          distance: { value: initial.distance, min: 0.5, max: 10, step: 0.1, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, leftPane: { ...useLevaStore.getState().environment.interior.leftPane, distance: v } } }) },
        }, { collapsed: true }),
      }, { collapsed: false })
    }, { collapsed: false })
  });

  return null;
};