import * as THREE from 'three';

interface CarbonTextures {
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
}

export const applyCarbonFiber = (
  material: THREE.MeshPhysicalMaterial,
  textures: CarbonTextures
): void => {
  material.color.setHex(0x1a1a1a);
  material.normalMap = textures.normalMap;
  material.roughnessMap = textures.roughnessMap;
  material.roughness = 1.0; 
  material.metalness = 0.0;
  material.clearcoat = 1.0;
  material.clearcoatRoughness = 0.05;
  material.sheen = 0.0;
  material.needsUpdate = true;
};

export const applyForgedCarbon = (
  material: THREE.MeshPhysicalMaterial, 
  textures: CarbonTextures
): void => {
  material.color.setHex(0x1a1a1a);
  material.normalMap = textures.normalMap;
  material.roughnessMap = textures.roughnessMap;
  
  // Il Forged Carbon è visivamente più "frastagliato", alziamo la scala della normal
  material.normalScale.set(0.08, 0.08);
  material.roughness = 1.0; 
  material.metalness = 0.0;
  material.clearcoat = 1.0;
  material.clearcoatRoughness = 0.02; // Leggermente più lucido per far risaltare il contrasto
  material.sheen = 0.0;
  material.needsUpdate = true;
};

