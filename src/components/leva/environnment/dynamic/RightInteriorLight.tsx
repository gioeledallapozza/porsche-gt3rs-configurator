import React from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const RightInteriorLight: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const initial = useLevaStore.getState().environment.interior.rightPane;

  const updateRightPane = (patch: Partial<typeof initial>) =>
    setTweaks('environment', {
      interior: {
        ...useLevaStore.getState().environment.interior,
        rightPane: { ...useLevaStore.getState().environment.interior.rightPane, ...patch },
      },
    });

  useControls({
    Environment: folder({
      Dynamic: folder({
        'Right Glass': folder({
          enabled: { value: initial.enabled, onChange: (v) => updateRightPane({ enabled: v }) },
          intensity: { value: initial.intensity, min: 0, max: 10, step: 0.1, onEditEnd: (v) => updateRightPane({ intensity: v }) },
          positionX: { value: initial.positionX, min: -3, max: 3, step: 0.05, onEditEnd: (v) => updateRightPane({ positionX: v }) },
          positionY: { value: initial.positionY, min: 0, max: 3, step: 0.05, onEditEnd: (v) => updateRightPane({ positionY: v }) },
          positionZ: { value: initial.positionZ, min: -3, max: 3, step: 0.05, onEditEnd: (v) => updateRightPane({ positionZ: v }) },
          targetX: { value: initial.targetX, min: -3, max: 3, step: 0.05, onEditEnd: (v) => updateRightPane({ targetX: v }) },
          targetY: { value: initial.targetY, min: -1, max: 3, step: 0.05, onEditEnd: (v) => updateRightPane({ targetY: v }) },
          targetZ: { value: initial.targetZ, min: -3, max: 3, step: 0.05, onEditEnd: (v) => updateRightPane({ targetZ: v }) },
          distance: { value: initial.distance, min: 0.5, max: 10, step: 0.1, onEditEnd: (v) => updateRightPane({ distance: v }) },
          angle: { value: initial.angle, min: 0.05, max: 1.55, step: 0.02, onEditEnd: (v) => updateRightPane({ angle: v }) },
          penumbra: { value: initial.penumbra, min: 0, max: 1, step: 0.05, onEditEnd: (v) => updateRightPane({ penumbra: v }) },
          decay: { value: initial.decay, min: 0, max: 4, step: 0.1, onEditEnd: (v) => updateRightPane({ decay: v }) },
        }, { collapsed: true }),
      }, { collapsed: false })
    }, { collapsed: false })
  });

  return null;
};