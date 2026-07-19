import * as THREE from 'three';

// PASTEL PAINT
export const applySolidPaint = (material: THREE.MeshPhysicalMaterial, hexColor: string): void => {
  material.color.set(hexColor);
  material.normalMap = null;
  material.roughnessMap = null;
  
  material.roughness = 0.1;
  material.metalness = 0.0; 

  material.clearcoat = 1.0;
  material.clearcoatRoughness = 0.01; 

  material.ior = 1.5;
  
  material.envMapIntensity = 1.0; 
  
  material.sheen = 0.0;
  material.needsUpdate = true;
};

// METALLIC PAINT
export const applyMetallicPaint = (
  material: THREE.MeshPhysicalMaterial, 
  hexColor: string, 
  flakeNormalMap: THREE.Texture,
  isGentianBlue: boolean = false
): void => {
  material.color.set(hexColor);

  material.normalMap = flakeNormalMap;
  
  material.normalScale.set(0.004, 0.004);
  
  material.roughnessMap = null;

  material.roughness = 0.45; 
  material.metalness = 0.6; 

  material.clearcoat = 1.0;
  material.clearcoatNormalMap = null; 
  material.clearcoatRoughness = 0.0;
  
  material.ior = 1.5; 

  if (isGentianBlue) {
    material.sheen = 1.0;
    material.sheenRoughness = 0.5;
    material.sheenColor.set('#4a0080'); 
  } else {
    material.sheen = 0.0;
  }

  material.needsUpdate = true;
};