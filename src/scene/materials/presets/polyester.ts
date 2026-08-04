import * as THREE from 'three';
// import { useLevaStore } from '@/store/levaStore';

export const applyPolyester = (
  material: THREE.MeshPhysicalMaterial, 
  hexColor: string
): void => {
  material.color.set(hexColor);
  
  material.roughness = 0.8;

  material.metalness = 0.1; 
  material.clearcoat = 0.0;
  material.clearcoatRoughness = 0.0;
  
  material.sheen = 0.5;
  material.sheenRoughness = 0.3;
  
  material.iridescence = 0.0;
  material.needsUpdate = true;
};