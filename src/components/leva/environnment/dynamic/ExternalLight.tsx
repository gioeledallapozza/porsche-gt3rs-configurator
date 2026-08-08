import React from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const ExternalLight: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const initial = useLevaStore.getState().environment.dynamic;

  useControls({
    Environment: folder({
      Dynamic: folder({
        External: folder({
          enabled: { value: initial.enabled, onChange: (v) => setTweaks('environment', { dynamic: { ...useLevaStore.getState().environment.dynamic, enabled: v } }) },
          showHelper: { value: initial.showHelper, onChange: (v) => setTweaks('environment', { dynamic: { ...useLevaStore.getState().environment.dynamic, showHelper: v } }) },
          intensity: { value: initial.intensity, min: 0, max: 5, step: 0.1, onEditEnd: (v) => setTweaks('environment', { dynamic: { ...useLevaStore.getState().environment.dynamic, intensity: v } }) },
          positionX: { value: initial.positionX, min: -10, max: 10, step: 0.1, onEditEnd: (v) => setTweaks('environment', { dynamic: { ...useLevaStore.getState().environment.dynamic, positionX: v } }) },
          positionY: { value: initial.positionY, min: -10, max: 10, step: 0.1, onEditEnd: (v) => setTweaks('environment', { dynamic: { ...useLevaStore.getState().environment.dynamic, positionY: v } }) },
          positionZ: { value: initial.positionZ, min: -10, max: 10, step: 0.1, onEditEnd: (v) => setTweaks('environment', { dynamic: { ...useLevaStore.getState().environment.dynamic, positionZ: v } }) },
          shadowBias: { value: initial.shadowBias, min: -0.01, max: 0.01, step: 0.0001, onEditEnd: (v) => setTweaks('environment', { dynamic: { ...useLevaStore.getState().environment.dynamic, shadowBias: v } }) },
          shadowNormalBias: { value: initial.shadowNormalBias, min: 0, max: 0.2, step: 0.001, onEditEnd: (v) => setTweaks('environment', { dynamic: { ...useLevaStore.getState().environment.dynamic, shadowNormalBias: v } }) },
          shadowMapSize: { value: initial.shadowMapSize, min: 256, max: 4096, step: 256, onEditEnd: (v) => setTweaks('environment', { dynamic: { ...useLevaStore.getState().environment.dynamic, shadowMapSize: v } }) },
          shadowCameraSize: { value: initial.shadowCameraSize, min: 0.5, max: 10, step: 0.1, onEditEnd: (v) => setTweaks('environment', { dynamic: { ...useLevaStore.getState().environment.dynamic, shadowCameraSize: v } }) },
        }, { collapsed: true }),
      }, { collapsed: false })
    }, { collapsed: false })
  });

  return null;
};