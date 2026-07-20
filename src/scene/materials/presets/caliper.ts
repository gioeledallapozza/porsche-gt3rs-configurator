import * as THREE from 'three';

export const applyCaliperPaint = (
  material: THREE.MeshPhysicalMaterial,
  hexColor: string
): void => {
  material.color.set(hexColor);

  material.metalness = 0.1;
  material.roughness = 0.15; 
  
  material.clearcoat = 1.0;
  material.clearcoatRoughness = 0.05;


  material.envMapIntensity = 1.2; 

  
  material.sheen = 0.0;
  material.needsUpdate = true;
};