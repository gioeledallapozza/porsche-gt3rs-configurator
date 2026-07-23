import React, { useEffect } from 'react';
import { useControls, folder } from 'leva';
import { useLevaStore } from '@/store/levaStore';

export const GlassLightsControls: React.FC = () => {
  const setTweaks = useLevaStore((state) => state.setTweaks);
  const state = useLevaStore.getState();

  const lights = useControls({
    'Materials': folder({
      'Glass': folder({
        'Optical Lights': folder({
          transmission: { value: state.glassLights.transmission, min: 0, max: 1 },
          opacity: { value: state.glassLights.opacity, min: 0, max: 1 },
          ior: { value: state.glassLights.ior, min: 1, max: 3 },
          thickness: { value: state.glassLights.thickness, min: 0, max: 2 },
          roughness: { value: state.glassLights.roughness, min: 0, max: 1 },
          metalness: { value: state.glassLights.metalness, min: 0, max: 1 },
          clearcoat: { value: state.glassLights.clearcoat, min: 0, max: 1 },
          clearcoatRoughness: { value: state.glassLights.clearcoatRoughness, min: 0, max: 1 },
          envMapIntensity: { value: state.glassLights.envMapIntensity, min: 0, max: 5 },
        }, { collapsed: true })
      }, { collapsed: true })
    }, { collapsed: true })
  });

  useEffect(() => { 
    setTweaks('glassLights', lights); 
  }, [lights, setTweaks]);

  return null;
};