import React from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const FrontKickMap: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const initial = useLevaStore.getState().environment;

  useControls({
    Environment: folder({
      Map: folder({
        'Front Kick': folder({
          intensity: { value: initial.lightformerFront, min: 0, max: 10, step: 0.1, onEditEnd: (v) => setTweaks('environment', { lightformerFront: v }) },
          scale: { value: initial.lightformerFrontScale, min: 1, max: 50, step: 1, onEditEnd: (v) => setTweaks('environment', { lightformerFrontScale: v }) },
        }, { collapsed: true }),
      }, { collapsed: false })
    }, { collapsed: false })
  });

  return null;
};