import React from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const RightInteriorLight: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const initial = useLevaStore.getState().environment.interior.rightPane;

  useControls({
    Environment: folder({
      Dynamic: folder({
        'Right Glass': folder({
          enabled: { value: initial.enabled, onChange: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, rightPane: { ...useLevaStore.getState().environment.interior.rightPane, enabled: v } } }) },
          intensity: { value: initial.intensity, min: 0, max: 10, step: 0.1, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, rightPane: { ...useLevaStore.getState().environment.interior.rightPane, intensity: v } } }) },
          positionX: { value: initial.positionX, min: -3, max: 3, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, rightPane: { ...useLevaStore.getState().environment.interior.rightPane, positionX: v } } }) },
          positionY: { value: initial.positionY, min: 0, max: 3, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, rightPane: { ...useLevaStore.getState().environment.interior.rightPane, positionY: v } } }) },
          positionZ: { value: initial.positionZ, min: -3, max: 3, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, rightPane: { ...useLevaStore.getState().environment.interior.rightPane, positionZ: v } } }) },
          rotationX: { value: initial.rotationX, min: -Math.PI, max: Math.PI, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, rightPane: { ...useLevaStore.getState().environment.interior.rightPane, rotationX: v } } }) },
          rotationY: { value: initial.rotationY, min: -Math.PI, max: Math.PI, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, rightPane: { ...useLevaStore.getState().environment.interior.rightPane, rotationY: v } } }) },
          rotationZ: { value: initial.rotationZ, min: -Math.PI, max: Math.PI, step: 0.05, onEditEnd: (v) => setTweaks('environment', { interior: { ...useLevaStore.getState().environment.interior, rightPane: { ...useLevaStore.getState().environment.interior.rightPane, rotationZ: v } } }) },
        }, { collapsed: true }),
      }, { collapsed: false })
    }, { collapsed: false })
  });

  return null;
};