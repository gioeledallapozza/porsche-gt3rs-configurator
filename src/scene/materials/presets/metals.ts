import { useLevaStore } from '@/store/levaStore';
import * as THREE from 'three';

export const applyAlloyFinish = (
  material: THREE.MeshPhysicalMaterial, 
  hexColor: string
): void => {

  const tweaks = useLevaStore.getState().metal;
  material.color.set(hexColor);
  
  material.roughness = tweaks.roughness;
  material.metalness = tweaks.metalness;
  

  material.envMapIntensity = tweaks.envMapIntensity;
  
  material.clearcoat = tweaks.clearcoat;
  material.clearcoatRoughness = tweaks.clearcoatRoughness;
  
  material.sheen = 0.0;

  
  material.needsUpdate = true;
};