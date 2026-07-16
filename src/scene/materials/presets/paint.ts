import * as THREE from 'three';

// PASTEL PAINT
export const applySolidPaint = (material: THREE.MeshPhysicalMaterial, hexColor: string): void => {
  material.color.set(hexColor);
  
  // Remove textures and reset properties
  material.normalMap = null;
  material.roughnessMap = null;
  material.roughness = 0.1; 
  material.metalness = 0.0; 

  material.envMapIntensity = 20.0;
  
  // Trasparente protettivo (Resina)
  material.clearcoat = 1.0;
  material.clearcoatRoughness = 0.0;
  
  // Reset special effect
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
  
  // Injection of flakes
  material.normalMap = flakeNormalMap;
  
  //Scale 
material.normalScale.set(0.005, 0.005);
  material.roughnessMap = null;
  
    material.roughness = 0.4; 
  material.metalness = 0.5;
  
  material.clearcoat = 1.0;
  material.clearcoatNormalMap = null;
  material.clearcoatRoughness = 0.05;

  // Flop Effect for gential blue HARDCODED TO CHANGE ONLY FOR TEST
  if (isGentianBlue) {
    material.sheen = 1.0;
    material.sheenColor.set('#4a0080'); // Purple tint under light
  } else {
    material.sheen = 0.0;
  }

  material.needsUpdate = true;
};