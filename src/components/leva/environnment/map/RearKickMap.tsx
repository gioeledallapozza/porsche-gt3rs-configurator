import React from 'react';
import { folder, useControls } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const RearKickMap: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const initial = useLevaStore.getState().environment;

  useControls({
    Environment: folder({
      Map: folder({
        'Rear Kick': folder({
          intensity: { value: initial.lightformerRear, min: 0, max: 10, step: 0.1, onEditEnd: (v) => setTweaks('environment', { lightformerRear: v }) },
          scale: { value: initial.lightformerRearScale, min: 1, max: 50, step: 1, onEditEnd: (v) => setTweaks('environment', { lightformerRearScale: v }) },
        }, { collapsed: true }),
      }, { collapsed: false })
    }, { collapsed: false })
  });

  return null;
};