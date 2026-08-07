import React from 'react';
import { useControls, folder } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const EnvironmentControls: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const environment = useLevaStore((state) => state.environment);

  useControls({
      Environment: folder({
        envInt: {
          value: environment.envIntensity,
          min: 0,
          max: 10,
          step: 0.1,
          onEditEnd: (value) => setTweaks('environment', { envIntensity: value as number }),
        },
        envScale: {
          value: environment.envScale,
          min: 1,
          max: 200,
          step: 1,
          onEditEnd: (value) => setTweaks('environment', { envScale: value as number }),
        },
        topInt: {
          value: environment.lightformerTop,
          min: 0,
          max: 10,
          step: 0.1,
          onEditEnd: (value) => setTweaks('environment', { lightformerTop: value as number }),
        },
        topScale: {
          value: environment.lightformerTopScale,
          min: 1,
          max: 50,
          step: 1,
          onEditEnd: (value) => setTweaks('environment', { lightformerTopScale: value as number }),
        },
        sideInt: {
          value: environment.lightformerSide,
          min: 0,
          max: 10,
          step: 0.1,
          onEditEnd: (value) => setTweaks('environment', { lightformerSide: value as number }),
        },
        sideScale: {
          value: environment.lightformerSideScale,
          min: 1,
          max: 50,
          step: 1,
          onEditEnd: (value) => setTweaks('environment', { lightformerSideScale: value as number }),
        },
        frontInt: {
          value: environment.lightformerFront,
          min: 0,
          max: 10,
          step: 0.1,
          onEditEnd: (value) => setTweaks('environment', { lightformerFront: value as number }),
        },
        frontScale: {
          value: environment.lightformerFrontScale,
          min: 1,
          max: 50,
          step: 1,
          onEditEnd: (value) => setTweaks('environment', { lightformerFrontScale: value as number }),
        },
        rearInt: {
          value: environment.lightformerRear,
          min: 0,
          max: 10,
          step: 0.1,
          onEditEnd: (value) => setTweaks('environment', { lightformerRear: value as number }),
        },
        rearScale: {
          value: environment.lightformerRearScale,
          min: 1,
          max: 50,
          step: 1,
          onEditEnd: (value) => setTweaks('environment', { lightformerRearScale: value as number }),
        },
        Dynamic: folder({
          enabled: {
            value: environment.dynamic.enabled,
            onChange: (value) => setTweaks('environment', { dynamic: { ...environment.dynamic, enabled: value as boolean } }),
          },
          showHelper: {
            value: environment.dynamic.showHelper,
            onChange: (value) => setTweaks('environment', { dynamic: { ...environment.dynamic, showHelper: value as boolean } }),
          },
          intensity: {
            value: environment.dynamic.intensity,
            min: 0,
            max: 5,
            step: 0.1,
            onEditEnd: (value) => setTweaks('environment', { dynamic: { ...environment.dynamic, intensity: value as number } }),
          },
          positionX: {
            value: environment.dynamic.positionX,
            min: -10,
            max: 10,
            step: 0.1,
            onEditEnd: (value) => setTweaks('environment', { dynamic: { ...environment.dynamic, positionX: value as number } }),
          },
          positionY: {
            value: environment.dynamic.positionY,
            min: -10,
            max: 10,
            step: 0.1,
            onEditEnd: (value) => setTweaks('environment', { dynamic: { ...environment.dynamic, positionY: value as number } }),
          },
          positionZ: {
            value: environment.dynamic.positionZ,
            min: -10,
            max: 10,
            step: 0.1,
            onEditEnd: (value) => setTweaks('environment', { dynamic: { ...environment.dynamic, positionZ: value as number } }),
          },
          shadowBias: {
            value: environment.dynamic.shadowBias,
            min: -0.01,
            max: 0.01,
            step: 0.0001,
            onEditEnd: (value) => setTweaks('environment', { dynamic: { ...environment.dynamic, shadowBias: value as number } }),
          },
          shadowNormalBias: {
            value: environment.dynamic.shadowNormalBias,
            min: 0,
            max: 0.2,
            step: 0.001,
            onEditEnd: (value) => setTweaks('environment', { dynamic: { ...environment.dynamic, shadowNormalBias: value as number } }),
          },
          shadowMapSize: {
            value: environment.dynamic.shadowMapSize,
            min: 256,
            max: 4096,
            step: 256,
            onEditEnd: (value) => setTweaks('environment', { dynamic: { ...environment.dynamic, shadowMapSize: value as number } }),
          },
          shadowCameraSize: {
            value: environment.dynamic.shadowCameraSize,
            min: 0.5,
            max: 10,
            step: 0.1,
            onEditEnd: (value) => setTweaks('environment', { dynamic: { ...environment.dynamic, shadowCameraSize: value as number } }),
          },
        }, { collapsed: true }),
      }, { collapsed: true }),
  });

  return null;
};
