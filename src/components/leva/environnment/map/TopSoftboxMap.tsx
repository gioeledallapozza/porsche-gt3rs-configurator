import React from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const TopSoftboxMap: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const initial = useLevaStore.getState().environment;

  useControls({
    Environment: folder({
      Map: folder({
        'Top Softbox': folder({
          intensity: { value: initial.lightformerTop, min: 0, max: 10, step: 0.1, onEditEnd: (v) => setTweaks('environment', { lightformerTop: v }) },
          scale: { value: initial.lightformerTopScale, min: 1, max: 50, step: 1, onEditEnd: (v) => setTweaks('environment', { lightformerTopScale: v }) },
        }, { collapsed: true }),
      }, { collapsed: false })
    }, { collapsed: false })
  });

  return null;
};