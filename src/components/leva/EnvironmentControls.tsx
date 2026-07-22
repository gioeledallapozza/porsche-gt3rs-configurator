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
      }, { collapsed: true }),
  });

  return null;
};
