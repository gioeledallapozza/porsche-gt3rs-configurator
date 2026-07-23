import React, { useEffect } from 'react';
import { useControls, folder } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const GlassCabinControls: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const state = useLevaStore.getState();

  const cabin = useControls({
    'Materials': folder({
      'Glass': folder({
        'Cabin Glass': folder({
          opacity: { value: state.glassCabin.opacity, min: 0, max: 1 },
          roughness: { value: state.glassCabin.roughness, min: 0, max: 1 },
          metalness: { value: state.glassCabin.metalness, min: 0, max: 1 },
          clearcoat: { value: state.glassCabin.clearcoat, min: 0, max: 1 },
          clearcoatRoughness: { value: state.glassCabin.clearcoatRoughness, min: 0, max: 1 },
          envMapIntensity: { value: state.glassCabin.envMapIntensity, min: 0, max: 5 },
        }, { collapsed: true })
      }, { collapsed: true })
    }, { collapsed: true })
  });

  useEffect(() => { 
    setTweaks('glassCabin', cabin); 
  }, [cabin, setTweaks]);

  return null;
};