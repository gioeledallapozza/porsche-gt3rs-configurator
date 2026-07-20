import * as THREE from 'three';

export const applyAlloyFinish = (
  material: THREE.MeshPhysicalMaterial, 
  hexColor: string
): void => {
  material.color.set(hexColor);
  
  material.roughness = 0.4;
  material.metalness = 0.95;
  

  material.envMapIntensity = 1.0;
  
  material.clearcoat = 0.3;
  material.clearcoatRoughness = 0.8;
  material.sheen = 0.0;

  
  material.needsUpdate = true;
};