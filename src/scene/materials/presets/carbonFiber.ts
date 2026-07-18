import * as THREE from 'three';

interface CarbonTextures {
  normalMap: THREE.Texture;
  roughnessMap: THREE.Texture;
}

export const applyCarbonFiber = (
  material: THREE.MeshPhysicalMaterial,
  textures: CarbonTextures
): void => {
  material.color.setHex(0x181818);
  material.normalMap = textures.normalMap;
  material.normalScale.set(0.05, 0.05);
  material.roughnessMap = textures.roughnessMap;

  material.roughness = 0.6; 
  material.metalness = 0.1;

  material.clearcoat = 1.0;
  material.clearcoatRoughness = 0.015;

  material.sheen = 0.0;
  material.needsUpdate = true;
};

export const applyForgedCarbon = (
  material: THREE.MeshPhysicalMaterial, 
  textures: CarbonTextures
): void => {
  material.color.setHex(0x181818);
  material.normalMap = textures.normalMap;
  material.roughnessMap = textures.roughnessMap;
  
  material.normalScale.set(0.1, 0.1);
  material.roughness = 0.5; 
  material.metalness = 0.1;

  material.clearcoat = 1.0;
  material.clearcoatRoughness = 0.015;
  material.sheen = 0.0;
  material.needsUpdate = true;
};

