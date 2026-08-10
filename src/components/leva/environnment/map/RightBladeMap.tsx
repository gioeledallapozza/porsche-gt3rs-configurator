import React from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const RightBladeMap: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const initial = useLevaStore.getState().environment;

  useControls({
    Environment: folder({
      Map: folder({
        'Right Blade': folder({
          intensity: { value: initial.lightformerSide, min: 0, max: 10, step: 0.1, onEditEnd: (v) => setTweaks('environment', { lightformerSide: v }) },
          scale: { value: initial.lightformerSideScale, min: 1, max: 50, step: 1, onEditEnd: (v) => setTweaks('environment', { lightformerSideScale: v }) },
        }, { collapsed: true }),
      }, { collapsed: false })
    }, { collapsed: false })
  });

  return null;
};