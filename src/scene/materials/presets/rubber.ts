import * as THREE from 'three';
import { useLevaStore } from '@/store/levaStore';

//Rubber
export const applyRubberFinish = (material: THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial): void => {
  const tweaks = useLevaStore.getState().rubber;

  material.color.setHex(0x8e9399); 

  material.map = null
  
  material.roughness = tweaks.roughness; 
  material.metalness = tweaks.metalness;  
  
  material.envMapIntensity = tweaks.envMapIntensity; 

  if ('clearcoat' in material) {
    material.clearcoat = 0.0;
    material.clearcoatRoughness = 0.0;
  }

  material.needsUpdate = true;
};