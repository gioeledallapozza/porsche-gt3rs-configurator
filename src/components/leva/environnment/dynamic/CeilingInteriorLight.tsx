import React from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const CeilingInteriorLight: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const initial = useLevaStore.getState().environment.interior.ceiling;

  // Single patch point: merges a partial update into environment.interior.ceiling.
  const updateCeiling = (patch: Partial<typeof initial>) =>
    setTweaks('environment', {
      interior: {
        ...useLevaStore.getState().environment.interior,
        ceiling: { ...useLevaStore.getState().environment.interior.ceiling, ...patch },
      },
    });

  useControls({
    Environment: folder({
      Dynamic: folder({
        Ceiling: folder({
          enabled: { value: initial.enabled, onChange: (v) => updateCeiling({ enabled: v }) },
          intensity: { value: initial.intensity, min: 0, max: 10, step: 0.1, onEditEnd: (v) => updateCeiling({ intensity: v }) },
          positionX: { value: initial.positionX, min: -5, max: 5, step: 0.05, onEditEnd: (v) => updateCeiling({ positionX: v }) },
          positionY: { value: initial.positionY, min: 0, max: 4, step: 0.05, onEditEnd: (v) => updateCeiling({ positionY: v }) },
          positionZ: { value: initial.positionZ, min: -3, max: 3, step: 0.05, onEditEnd: (v) => updateCeiling({ positionZ: v }) },
          targetX: { value: initial.targetX, min: -3, max: 3, step: 0.05, onEditEnd: (v) => updateCeiling({ targetX: v }) },
          targetY: { value: initial.targetY, min: -1, max: 3, step: 0.05, onEditEnd: (v) => updateCeiling({ targetY: v }) },
          targetZ: { value: initial.targetZ, min: -3, max: 3, step: 0.05, onEditEnd: (v) => updateCeiling({ targetZ: v }) },
          distance: { value: initial.distance, min: 0.5, max: 10, step: 0.1, onEditEnd: (v) => updateCeiling({ distance: v }) },
          angle: { value: initial.angle, min: 0.05, max: 1.55, step: 0.02, onEditEnd: (v) => updateCeiling({ angle: v }) }, // clamped: SpotLight.angle caps at PI/2 internally, PI was never reachable
          penumbra: { value: initial.penumbra, min: 0, max: 1, step: 0.05, onEditEnd: (v) => updateCeiling({ penumbra: v }) },
          decay: { value: initial.decay, min: 0, max: 4, step: 0.1, onEditEnd: (v) => updateCeiling({ decay: v }) },
        }, { collapsed: true }),
      }, { collapsed: false })
    }, { collapsed: false })
  });

  return null;
};