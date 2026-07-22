import { useLevaStore } from '@/store/levaStore';
import * as THREE from 'three';

export const applyCaliperPaint = (
  material: THREE.MeshPhysicalMaterial,
  hexColor: string
): void => {
  const tweaks = useLevaStore.getState().caliper;
  
  material.color.set(hexColor);

  material.metalness = tweaks.metalness;
  material.roughness = tweaks.roughness; 
  
  material.clearcoat = tweaks.clearcoat;
  material.clearcoatRoughness = tweaks.clearcoatRoughness;

  material.envMapIntensity = tweaks.envMapIntensity; 

  material.sheen = 0.0;
  material.needsUpdate = true;
};