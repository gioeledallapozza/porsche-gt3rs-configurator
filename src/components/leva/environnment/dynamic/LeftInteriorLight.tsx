import React from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const LeftInteriorLight: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const initial = useLevaStore.getState().environment.interior.leftPane;

  const updateLeftPane = (patch: Partial<typeof initial>) =>
    setTweaks('environment', {
      interior: {
        ...useLevaStore.getState().environment.interior,
        leftPane: { ...useLevaStore.getState().environment.interior.leftPane, ...patch },
      },
    });

  useControls({
    Environment: folder({
      Dynamic: folder({
        'Left Glass': folder({
          enabled: { value: initial.enabled, onChange: (v) => updateLeftPane({ enabled: v }) },
          intensity: { value: initial.intensity, min: 0, max: 10, step: 0.1, onEditEnd: (v) => updateLeftPane({ intensity: v }) },
          positionX: { value: initial.positionX, min: -3, max: 3, step: 0.05, onEditEnd: (v) => updateLeftPane({ positionX: v }) },
          positionY: { value: initial.positionY, min: 0, max: 3, step: 0.05, onEditEnd: (v) => updateLeftPane({ positionY: v }) },
          positionZ: { value: initial.positionZ, min: -3, max: 3, step: 0.05, onEditEnd: (v) => updateLeftPane({ positionZ: v }) },
          targetX: { value: initial.targetX, min: -3, max: 3, step: 0.05, onEditEnd: (v) => updateLeftPane({ targetX: v }) },
          targetY: { value: initial.targetY, min: -1, max: 3, step: 0.05, onEditEnd: (v) => updateLeftPane({ targetY: v }) },
          targetZ: { value: initial.targetZ, min: -3, max: 3, step: 0.05, onEditEnd: (v) => updateLeftPane({ targetZ: v }) },
          distance: { value: initial.distance, min: 0.5, max: 10, step: 0.1, onEditEnd: (v) => updateLeftPane({ distance: v }) },
          angle: { value: initial.angle, min: 0.05, max: 1.55, step: 0.02, onEditEnd: (v) => updateLeftPane({ angle: v }) },
          penumbra: { value: initial.penumbra, min: 0, max: 1, step: 0.05, onEditEnd: (v) => updateLeftPane({ penumbra: v }) },
          decay: { value: initial.decay, min: 0, max: 4, step: 0.1, onEditEnd: (v) => updateLeftPane({ decay: v }) },
        }, { collapsed: true }),
      }, { collapsed: false })
    }, { collapsed: false })
  });

  return null;
};